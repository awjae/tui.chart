import BoxSeries, { isLeftBottomSide } from './boxSeries';
import {
  BoxSeriesType,
  BoxSeriesDataType,
  ColumnChartOptions,
  BarChartOptions,
  Point,
  Connector,
} from '@t/options';
import {
  ChartState,
  StackSeriesData,
  StackGroupData,
  BoxType,
  Stack,
  StackDataValues,
  PercentScaleType,
  StackTotal,
} from '@t/store/store';
import { TooltipData } from '@t/components/tooltip';
import { RectModel } from '@t/components/series';
import { deepCopyArray, includes } from '@src/helpers/utils';
import { LineModel } from '@t/components/axis';
import { getLimitOnAxis } from '@src/helpers/axes';
import { isGroupStack, isPercentStack } from '@src/store/stackSeriesData';

type RenderOptions = {
  stack: Stack;
  scaleType: PercentScaleType;
  tickDistance: number;
  min: number;
  max: number;
  diverging: boolean;
  hasPositiveOnly: boolean;
  hasNegativeOnly: boolean;
};

function exceedEdge(renderOptions: RenderOptions, totalOfPrev: number) {
  const { min, max, hasPositiveOnly, hasNegativeOnly } = renderOptions;

  return (hasPositiveOnly && totalOfPrev > max) || (hasNegativeOnly && totalOfPrev < min);
}

function calibrateFirstValue(value: number, renderOptions: RenderOptions) {
  const { min, max, hasPositiveOnly, hasNegativeOnly } = renderOptions;
  let result = value;

  if (hasPositiveOnly && min > 0) {
    result = value - min;
  }

  if (hasNegativeOnly && max < 0) {
    result = value - max;
  }

  return result;
}

function calibrateDrawingValue(
  values: number[],
  seriesIndex: number,
  renderOptions: RenderOptions
) {
  const { stack, min, max } = renderOptions;

  if (isPercentStack(stack)) {
    return values[seriesIndex];
  }

  const totalOfPrevValues = sumOfPrevValues(values, seriesIndex, false);
  const totalOfValues = sumOfPrevValues(values, seriesIndex, true);

  if (exceedEdge(renderOptions, totalOfPrevValues)) {
    return 0;
  }

  if (seriesIndex === 0) {
    return calibrateFirstValue(values[seriesIndex], renderOptions);
  }

  let result = values[seriesIndex];

  if (totalOfValues > max) {
    result = max - totalOfPrevValues;
  }

  if (totalOfValues < min) {
    result = min - totalOfPrevValues;
  }

  if (totalOfPrevValues < min) {
    result = totalOfValues - min;
  }

  if (totalOfPrevValues > max) {
    result = totalOfValues - max;
  }

  return result;
}

function sumOfPrevValues(values: number[], currentIndex: number, included = false) {
  const curValue = values[currentIndex];

  return values.reduce((total, value, idx) => {
    const isPrev = included ? idx <= currentIndex : idx < currentIndex;
    const isSameSign = value * curValue >= 0;

    if (isPrev && isSameSign) {
      return total + value;
    }

    return total;
  }, 0);
}

function getDivisorForPercent(total: StackTotal, scaleType: PercentScaleType) {
  const { positive, negative } = total;
  let divisor = positive + Math.abs(negative);

  if (includes(['dualPercentStack', 'divergingPercentStack'], scaleType)) {
    divisor *= 2;
  }

  return divisor;
}

export default class BoxStackSeries extends BoxSeries {
  render<T extends BarChartOptions | ColumnChartOptions>(chartState: ChartState<T>) {
    const { layout, theme, axes, categories, stackSeries, options } = chartState;

    if (!stackSeries[this.name]) {
      return;
    }

    this.plot = layout.plot;
    this.rect = this.makeSeriesRect(layout.plot);

    const seriesData = stackSeries[this.name] as StackSeriesData<BoxType>;
    const { stack, scaleType } = seriesData;
    const { colors } = theme.series;
    const { tickDistance } = axes[this.labelAxis];
    const { labels, tickCount } = axes[this.valueAxis];
    const diverging = !!options.series?.diverging;
    const { min, max } = getLimitOnAxis(labels, diverging);
    const renderOptions: RenderOptions = {
      stack,
      scaleType,
      tickDistance,
      min,
      max,
      diverging,
      hasPositiveOnly: labels.every((label) => Number(label) >= 0),
      hasNegativeOnly: labels.every((label) => Number(label) <= 0),
    };

    this.basePosition = this.getBasePosition(labels, tickCount);

    const { series, connector } = this.renderStackSeriesModel(seriesData, colors, renderOptions);
    const hoveredSeries = this.renderHighlightSeriesModel(series);
    const tooltipData: TooltipData[] = this.getTooltipData(seriesData, colors, categories);

    this.models = {
      clipRect: [this.renderClipRectAreaModel()],
      series,
      connector,
    };

    if (!this.drawModels) {
      this.drawModels = {
        clipRect: this.models.clipRect,
        series: deepCopyArray(series),
        connector: deepCopyArray(connector),
      };
    }

    this.responders = hoveredSeries.map((m, index) => ({
      ...m,
      data: tooltipData[index],
    }));
  }

  renderStackSeriesModel(
    seriesData: StackSeriesData<BoxType>,
    colors: string[],
    renderOptions: RenderOptions
  ) {
    const { stackData } = seriesData;

    return isGroupStack(stackData)
      ? this.makeStackGroupSeriesModel(seriesData, [...colors], renderOptions)
      : this.makeStackSeriesModel(stackData, renderOptions, colors);
  }

  makeStackSeriesModel(
    stackData: StackDataValues,
    renderOptions: RenderOptions,
    colors?: string[],
    stackGroupCount = 1,
    stackGroupIndex = 0
  ) {
    const seriesModels: RectModel[] = [];
    const columnWidth = this.getStackColumnWidth(renderOptions, stackGroupCount);
    const { diverging } = renderOptions;
    const isLBSide = diverging && isLeftBottomSide(stackGroupIndex);

    stackData.forEach(({ values, total }, dataIndex) => {
      const seriesPos = this.getSeriesPosition(
        renderOptions,
        columnWidth,
        dataIndex,
        stackGroupIndex
      );

      const ratio = this.getStackValueRatio(total, renderOptions);

      values.forEach((value, seriesIndex) => {
        const barLength = this.getStackBarLength(values, seriesIndex, ratio, renderOptions);
        const startPosition = this.getStackStartPosition(
          values,
          seriesIndex,
          ratio,
          renderOptions,
          isLBSide
        );

        seriesModels.push({
          type: 'rect',
          color: colors![seriesIndex],
          ...this.getAdjustedRect(seriesPos, startPosition!, barLength, columnWidth),
        });
      });
    });

    return {
      series: seriesModels,
      connector: this.makeConnectorSeriesModel(
        stackData,
        renderOptions,
        stackGroupCount,
        stackGroupIndex
      ),
    };
  }

  makeStackGroupSeriesModel(
    stackSeries: StackSeriesData<BoxType>,
    colors: string[],
    renderOptions: RenderOptions
  ) {
    const { stack } = renderOptions;
    const stackGroupData = stackSeries.stackData as StackGroupData;
    const seriesRawData = stackSeries.data;
    const stackGroupIds = Object.keys(stackGroupData);

    let seriesModels: RectModel[] = [];
    let connectorModels: LineModel[] = [];

    stackGroupIds.forEach((groupId, groupIndex) => {
      const filtered = seriesRawData.filter(({ stackGroup }) => stackGroup === groupId);
      const { series, connector } = this.makeStackSeriesModel(
        stackGroupData[groupId],
        renderOptions,
        colors.splice(groupIndex, filtered.length),
        stackGroupIds.length,
        groupIndex
      );

      seriesModels = [...seriesModels, ...series];

      if (stack.connector) {
        connectorModels = [...connectorModels, ...connector];
      }
    });

    return {
      series: seriesModels,
      connector: connectorModels,
    };
  }

  makeConnectorSeriesModel(
    stackData: StackDataValues,
    renderOptions: RenderOptions,
    stackGroupCount = 1,
    stackGroupIndex = 0
  ) {
    const {
      diverging,
      stack: { connector },
    } = renderOptions;

    if (!connector) {
      return [];
    }

    const columnWidth = this.getStackColumnWidth(renderOptions, stackGroupCount);
    const isLBSide = diverging && isLeftBottomSide(stackGroupIndex);
    const connectorPoints: Array<Point[]> = [];

    stackData.forEach(({ values, total }, index) => {
      const seriesPos = this.getSeriesPosition(renderOptions, columnWidth, index, stackGroupIndex);
      const points: Point[] = [];
      const ratio = this.getStackValueRatio(total, renderOptions);

      values.forEach((value, seriesIndex) => {
        const barLength = value * ratio;
        const startPosition = this.getStackStartPosition(
          values,
          seriesIndex,
          ratio,
          renderOptions,
          isLBSide
        );
        const { x, y } = this.getAdjustedRect(seriesPos, startPosition!, barLength, columnWidth);

        const xPos = !isLBSide && this.isBar ? x + barLength : x;
        const yPos = isLBSide && !this.isBar ? y + barLength : y;

        points.push({ x: xPos, y: yPos });
      });

      connectorPoints.push(points);
    });

    return this.makeConnectorModel(connectorPoints, connector, columnWidth);
  }

  private getTooltipData(
    seriesData: StackSeriesData<BoxType>,
    colors: string[],
    categories?: string[]
  ) {
    const seriesRawData = seriesData.data;
    const { stackData } = seriesData;

    return isGroupStack(stackData)
      ? this.makeGroupStackTooltipData(seriesRawData, stackData, colors, categories)
      : this.makeStackTooltipData(seriesRawData, stackData, colors, categories);
  }

  private makeGroupStackTooltipData(
    seriesRawData: BoxSeriesType<BoxSeriesDataType>[],
    stackData: StackGroupData,
    colors: string[],
    categories?: string[]
  ) {
    return Object.keys(stackData).flatMap((groupId, groupIdx) => {
      const filtered = seriesRawData.filter(({ stackGroup }) => stackGroup === groupId);
      const groupColors = colors.splice(groupIdx, filtered.length);

      return this.makeStackTooltipData(seriesRawData, stackData[groupId], groupColors, categories);
    });
  }

  private makeStackTooltipData(
    seriesRawData: BoxSeriesType<BoxSeriesDataType>[],
    stackData: StackDataValues,
    colors: string[],
    categories?: string[]
  ) {
    return stackData.flatMap(({ values }, index) =>
      values.map((value, seriesIndex) => ({
        label: seriesRawData[seriesIndex].name,
        color: colors[seriesIndex],
        value,
        category: categories?.[index],
      }))
    );
  }

  private makeConnectorModel(
    pointsForConnector: Array<Point[]>,
    connector: boolean | Required<Connector>,
    columnWidth: number
  ) {
    if (!connector || !pointsForConnector.length) {
      return [];
    }

    const { type: lineType, color: strokeStyle, width: lineWidth } = connector as Required<
      Connector
    >;
    const connectorModels: LineModel[] = [];
    const seriesDataCount = pointsForConnector.length;
    const seriesCount = pointsForConnector[0].length;

    for (let seriesIndex = 0; seriesIndex < seriesCount; seriesIndex += 1) {
      const points: Point[] = [];

      for (let dataIndex = 0; dataIndex < seriesDataCount; dataIndex += 1) {
        points.push(pointsForConnector[dataIndex][seriesIndex]);
      }

      points.forEach((point, index) => {
        const { x, y } = point;

        if (index < points.length - 1) {
          const { x: nextX, y: nextY } = points[index + 1];

          connectorModels.push({
            type: 'line',
            x: this.isBar ? x : x + columnWidth,
            y: this.isBar ? y + columnWidth : y,
            x2: nextX,
            y2: nextY,
            dashedPattern: lineType === 'dashed' ? [5, 5] : [],
            strokeStyle,
            lineWidth,
          });
        }
      });
    }

    return connectorModels;
  }

  private getStackValueRatio(total: StackTotal, renderOptions: RenderOptions) {
    const { stack, scaleType, min, max, diverging } = renderOptions;

    return isPercentStack(stack)
      ? this.getPercentRatio(total, scaleType)
      : this.getValueRatio(min, max, diverging);
  }

  // eslint-disable-next-line complexity
  private getStackStartPosition(
    values: number[],
    currentIndex: number,
    ratio: number,
    renderOptions: RenderOptions,
    isLBSide: boolean
  ) {
    const { min, max, stack, diverging, hasPositiveOnly, hasNegativeOnly } = renderOptions;
    const basePosition = this.basePosition;

    if (diverging) {
      if (isLBSide) {
        return this.getStartPositionWhenLeftBottomSide(values, currentIndex, ratio);
      }

      const totalPrevValues = sumOfPrevValues(
        values,
        currentIndex,
        this.isBar ? values[currentIndex] < 0 : values[currentIndex] > 0
      );

      if (totalPrevValues > max) {
        return this.hoverThickness;
      }

      return this.isBar
        ? totalPrevValues * ratio + basePosition + this.axisThickness
        : basePosition - totalPrevValues * ratio;
    }

    if (isPercentStack(stack)) {
      return this.getStartPositionOnPercent(values, currentIndex, renderOptions, ratio);
    }

    if (hasNegativeOnly) {
      return this.getStartPositionWhenNegativeOnly(values, currentIndex, renderOptions, ratio);
    }

    if (hasPositiveOnly) {
      return this.getStartPositionWhenPositiveOnly(values, currentIndex, renderOptions, ratio);
    }

    const totalOfPrevValues = sumOfPrevValues(values, currentIndex, false);
    const totalOfValues = sumOfPrevValues(values, currentIndex, true);
    const value = values[currentIndex];
    const isLB = value < 0;

    let result = 0; // totalOfPrevValues;

    if (isLB) {
      if (totalOfPrevValues < min) {
        return;
      }

      if (totalOfValues < min) {
        return this.isBar
          ? this.hoverThickness + this.axisThickness
          : basePosition - totalOfPrevValues * ratio;
      }

      result = this.isBar ? values[currentIndex] : 0;

      return this.isBar ? result * ratio + basePosition : basePosition - result * ratio;
    }

    result = this.isBar ? 0 : totalOfValues;
    // LB가 아닐 때
    if (totalOfPrevValues > max) {
      return;
    }

    if (totalOfValues > max) {
      return this.isBar
        ? totalOfPrevValues * ratio + basePosition + this.axisThickness
        : this.hoverThickness + this.axisThickness;
    }

    return this.isBar
      ? result * ratio + basePosition + this.axisThickness
      : basePosition - result * ratio;
    /*
    const totalPrevValues = sumOfPrevValues(
      values,
      currentIndex,
      this.isBar ? values[currentIndex] < 0 : values[currentIndex] > 0
    );

    if (totalPrevValues > max) {
      return this.hoverThickness;
    }

    return this.isBar
      ? totalPrevValues * ratio + basePosition + this.axisThickness
      : basePosition - totalPrevValues * ratio;
    */
  }

  private getStackBarLength(
    values: number[],
    seriesIndex: number,
    ratio: number,
    renderOptions: RenderOptions
  ) {
    const drawingValue = calibrateDrawingValue(values, seriesIndex, renderOptions);

    return this.barLength(drawingValue, ratio);
  }

  private getStackColumnWidth(renderOptions: RenderOptions, stackGroupCount: number) {
    const { tickDistance, diverging } = renderOptions;
    const divisor = diverging ? 1 : stackGroupCount;

    return (tickDistance - this.padding * 2) / divisor;
  }

  private getSeriesPosition(
    renderOptions: RenderOptions,
    columnWidth: number,
    dataIndex: number,
    stackGroupIndex: number
  ) {
    const { tickDistance, diverging } = renderOptions;
    const groupIndex = diverging ? 0 : stackGroupIndex;

    return dataIndex * tickDistance + this.padding + columnWidth * groupIndex + this.hoverThickness;
  }

  private getStartPositionWhenLeftBottomSide(
    values: number[],
    currentIndex: number,
    ratio: number
  ) {
    const basePosition = this.basePosition;
    const totalPrevValues = sumOfPrevValues(values, currentIndex, this.isBar);

    return this.isBar
      ? basePosition - totalPrevValues * ratio + this.axisThickness
      : basePosition + totalPrevValues * ratio;
  }

  private getStartPositionWhenNegativeOnly(
    values: number[],
    currentIndex: number,
    renderOptions: RenderOptions,
    ratio: number
  ) {
    if (!this.isBar) {
      return this.getStartPositionWhenNegativeOnlyOnColumn(
        values,
        currentIndex,
        renderOptions,
        ratio
      );
    }

    const basePosition = this.basePosition;
    const { min, max } = renderOptions;
    let totalOfValues = sumOfPrevValues(values, currentIndex, true);

    const totalOfPrevValues = sumOfPrevValues(values, currentIndex, false);
    if (min > totalOfPrevValues) {
      return;
    }

    if (totalOfValues < min) {
      totalOfValues = min;
    }

    if (max < 0) {
      totalOfValues = totalOfValues - max;
    }

    return basePosition - Math.abs(totalOfValues) * ratio + this.axisThickness;
  }

  private getStartPositionWhenNegativeOnlyOnColumn(
    values: number[],
    currentIndex: number,
    renderOptions: RenderOptions,
    ratio: number
  ) {
    const basePosition = this.basePosition;
    const { min, max } = renderOptions;
    const totalOfValues = sumOfPrevValues(values, currentIndex, true);
    const totalOfPrevValues = sumOfPrevValues(values, currentIndex, false);
    const exceed =
      (currentIndex === 0 && totalOfValues > max) || (currentIndex > 0 && totalOfPrevValues < min);

    if (exceed) {
      return;
    }

    let result = totalOfPrevValues;

    if (min < 0 && currentIndex > 0) {
      result = totalOfPrevValues - max;
    }

    if (max < totalOfPrevValues) {
      return this.hoverThickness;
    }

    return basePosition + Math.abs(result) * ratio;
  }

  private getStartPositionWhenPositiveOnly(
    values: number[],
    currentIndex: number,
    renderOptions: RenderOptions,
    ratio: number
  ) {
    if (!this.isBar) {
      return this.getStartPositionWhenPositiveOnlyOnColumn(
        values,
        currentIndex,
        renderOptions,
        ratio
      );
    }

    const basePosition = this.basePosition;
    const { min, max } = renderOptions;
    const totalOfValues = sumOfPrevValues(values, currentIndex, true);
    const totalOfPrevValues = sumOfPrevValues(values, currentIndex, false);
    const exceed = min > totalOfValues || max < totalOfPrevValues;

    if (exceed) {
      return;
    }

    let result = totalOfPrevValues;

    if (min > 0 && currentIndex > 0) {
      if (totalOfPrevValues < min) {
        result = 0;
      } else {
        result = totalOfPrevValues - min;
      }
    }

    return result * ratio + basePosition + this.axisThickness;
  }

  private getStartPositionWhenPositiveOnlyOnColumn(
    values: number[],
    currentIndex: number,
    renderOptions: RenderOptions,
    ratio: number
  ) {
    const basePosition = this.basePosition;
    const { min, max } = renderOptions;
    const totalOfValues = sumOfPrevValues(values, currentIndex, true);
    const totalOfPrevValues = sumOfPrevValues(values, currentIndex, false);
    const exceed = min > totalOfValues || max < totalOfPrevValues;

    if (exceed) {
      return;
    }

    let result = totalOfValues;

    if (min > 0) {
      result -= min;
    }

    if (max < totalOfValues) {
      return this.hoverThickness;
    }

    return basePosition - result * ratio;
  }

  private getStartPositionOnPercent(
    values: number[],
    currentIndex: number,
    renderOptions: RenderOptions,
    ratio: number
  ) {
    const basePosition = this.basePosition;
    const { min } = renderOptions;
    const totalPrevValues = sumOfPrevValues(
      values,
      currentIndex,
      this.isBar ? values[currentIndex] < 0 : values[currentIndex] > 0
    );

    const value = values[currentIndex];

    if (currentIndex === 0 && min > value) {
      return;
    }

    return this.isBar
      ? totalPrevValues * ratio + basePosition + this.axisThickness
      : basePosition - totalPrevValues * ratio;
  }

  private getPercentRatio(total: StackTotal, scaleType: PercentScaleType) {
    return this.getOffsetSize() / getDivisorForPercent(total, scaleType);
  }
}

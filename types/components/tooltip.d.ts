import { BubblePoint, Point, RangeDataType } from '../options';

export type RadiusRange = { inner: number; outer: number };

export type TooltipTitleValues = {
  title: string;
  value: TooltipDataValue;
  formattedValue?: string;
}[];
export type TooltipValue = string | number | BubblePoint | Point | RangeDataType<number>;
export type TooltipDataValue = TooltipValue | TooltipTitleValues;

type BodyTemplateFunc = (model: TooltipModel) => string;

export type TooltipData = {
  label: string;
  color: string;
  value: TooltipDataValue;
  formattedValue?: string;
  category?: string;
  rootParentName?: string;
  bodyTemplateFunc?: BodyTemplateFunc;
};

export type TooltipInfo = {
  data: TooltipData;
  radius?: number | RadiusRange;
  width?: number;
  height?: number;
} & Point;

export type TooltipModel = {
  type: 'tooltip';
  data: TooltipData[];
  category?: string;
  target: {
    radius: number;
    width: number;
    height: number;
  };
  bodyTemplateFunc?: BodyTemplateFunc;
} & Point;

export type TooltipModelName =
  | 'line'
  | 'scatter'
  | 'bubble'
  | 'area'
  | 'boxPlot'
  | 'bar'
  | 'column'
  | 'pie'
  | 'radar'
  | 'radial'
  | 'bullet';

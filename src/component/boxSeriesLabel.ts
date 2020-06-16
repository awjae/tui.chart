import { includes } from '@src/helpers/utils';
import { LabelModel } from '@t/components/axis';

export class BoxSeriesLabel {
  constructor(model, labelOptions) {
    const { x, y, width, height, label } = model;
    const {
      font = 'normal 11px Arial',
      color = '#333333',
      align = 'center',
      baseline = 'bottom',
      formatter,
      direction = 'horizontal',
      inside = false,
    } = labelOptions;
  }
}

export class BoxStackSeriesLabel {
  model: LabelModel;

  constructor(model, labelOptions) {
    const { width, height, label } = model;
    let { x, y } = model;

    const {
      font = 'normal 11px Arial',
      color = '#333333',
      align = 'center',
      baseline = 'middle',
      formatter,
      direction = 'horizontal',
      total,
    } = labelOptions;

    /*
    let font = 'normal 11px Arial',
    let color = '#333333',
   let align = 'center',
   let baseline = 'middle',
   let formatter,
   */
    let textAlign = 'center';
    let textBaseline = 'middle';
    let style = { font, fillStyle: color };

    if (direction === 'horizontal') {
      y = model.y + height / 2;

      x = model.x + width / 2;

      if (includes(['left', 'start'], align)) {
        x = model.x;
        textAlign = align;
      } else if (includes(['right', 'end'], align)) {
        x = model.x + width;
        textAlign = align;
      }
    } else {
      x = model.x + width / 2;
      y = model.y + height / 2;

      if (align === 'top') {
        y = model.y;
        textBaseline = 'top';
      } else if (align === 'bottom') {
        y = model.y + height;
        textBaseline = 'bottom';
      }
    }

    style = Object.assign(style, {
      textAlign,
      textBaseline,
    });

    this.model = {
      type: 'label',
      text: label,
      x,
      y,
      style: ['default', style],
    };
  }
}

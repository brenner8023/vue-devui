import './item.scss';

import { defineComponent } from 'vue';
import { itemProps, ItemProps } from './item-types';

export default defineComponent({
  name: 'DSkeletonItem',
  props: itemProps,
  setup(props: ItemProps, ctx) {
    const { slots } = ctx;

    function renderAnimate(isAnimated) {
      return isAnimated ? 'devui-skeleton__animated' : '';
    }

    function renderShapeParagraph(rowNum, rowWidth, round) {
      const arr = [];

      function pushIntoArray(type) {
        for (let index = 0; index < rowNum; index++) {
          arr.push({ width: type });
        }
      }
      (function handleRowWidth() {
        if (rowWidth instanceof Array) {
          for (let index = 0; index < rowNum; index++) {
            if (rowWidth[index]) {
              switch (typeof rowWidth[index]) {
              case 'string':
                arr.push({ width: rowWidth[index] });
                break;
              case 'number':
                arr.push({ width: `${rowWidth[index]}px` });
              }
            } else {
              arr.push({ width: 1 });
            }
          }
        } else {
          switch (typeof rowWidth) {
          case 'string':
            pushIntoArray(rowWidth);
            break;
          case 'number':
            pushIntoArray(`${rowWidth}px`);
            break;
          }
        }
      })();

      return <div class={`devui-skeleton__shape__paragraph ${renderAnimate(props.animate)}`} {...ctx.attrs}>{
        arr.map(item => {
          return <div class="devui-skeleton__shape__paragraph__item" style={round ? 'border-radius: 1em;' : '' + `width: ${item.width}`} />;
        })
      }</div>;
    }

    function renderAvatarStyle(avatarShape) {
      function renderAvatarShape() {
        return avatarShape === 'square' ? '' : 'border-radius:50%;';
      }

      return (renderAvatarShape(avatarShape));
    }

    return () => {
      if (props.loading && props.shape) {
        switch (props.shape) {
        case 'avatar':
          return <>
            <div class={`devui-skeleton__shape__avatar ${renderAnimate(props.animate)}`}
              style={renderAvatarStyle(props.avatarShape)} {...ctx.attrs} />
          </>;
        case 'paragraph':
          return <>
            {renderShapeParagraph(props.row, props.rowWidth, props.round)}
          </>;
        default:
          return <>
            <div class={`devui-skeleton__shape__${props.shape} ${renderAnimate(props.animate)}`} {...ctx.attrs} />
          </>;
        }
      }
      return <>{slots.default?.()}</>;
    };
  }
});

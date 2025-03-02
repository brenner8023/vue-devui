import { defineComponent, ref, onUnmounted ,onMounted } from 'vue';
import { countdownProps, CountdownProps } from './countdown-types';
import './countdown.scss';
import { getFormatTime, getLegalTime, getTimeSplit, getDeduplication, numFormat } from './utils';

export default defineComponent({
  name: 'DCountdown',
  props: countdownProps,
  emits: ['onChange', 'onFinish'],
  setup(props: CountdownProps, ctx) {
    const countdown = ref<number>();
    const s = getDeduplication(props.format);
    const timeFormat = getTimeSplit(props.format);
    const timeStr = ref('');

    const getTimeStr = (legalTime: Map<string, number>) => {
      const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S']);
      const t = timeFormat.reduce((pre, cur) => {
        if (fomatMap.has(cur.k)) {
          return pre + numFormat(legalTime.get(cur.k), cur.n);
        }
        return pre + cur.k;
      }, '');
      timeStr.value = t;
    };

    const getTime = () => {
      const value = new Date(props.value).getTime();
      const leftTime = value > new Date().getTime() ? value - new Date().getTime() : 0;
      const formatTime = getFormatTime(leftTime);
      const legalTime = getLegalTime(s, formatTime);
      !ctx.slots.default && getTimeStr(legalTime);
      ctx.emit('onChange', {
        leftTime,
        formatTime,
        legalTime
      });
      return leftTime;
    };

    const startTime = () => {
      getTime();
      if (countdown.value) {return;}
      countdown.value = setInterval(() => {
        const t = getTime();
        if (t === 0) {
          ctx.emit('onFinish');
          clearInterval(countdown.value);
        }
      }, s.has('S') ? 100 : 1000);

    };

    onMounted(()=>{
      startTime();
    });
    onUnmounted(() => {
      clearInterval(countdown.value);
    });
    return () => {
      return (<div class="devui-countdown">
        {
          ctx.slots.default ? ctx.slots.default() : (
            <div class="countdown-content" style={props.valueStyle}>
              <span class="countdown-prefix">
                {props.prefix}
              </span>
              <span class="countdown-value">
                {timeStr.value}
              </span>
              <span class="countdown-suffix">
                {props.suffix}
              </span>
            </div>
          )
        }
      </div>
      );
    };
  }
});


export const RESULT_SCREEN = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const screenMedias = {
  xs: 'screen and (max-width: 575px)',
  sm: 'screen and (min-width: 576px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 992px)',
  xl: 'screen and (min-width: 1200px)',
  xxl: 'screen and (min-width: 1600px)',
} as const;

export interface Screen {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
}

export type ScreenMediasKey = keyof typeof screenMedias;
type SubscribeCb = (screen: Screen) => void;

const subscribers = new Map<number, SubscribeCb>();
let subUid = -1;
const screen: Screen = {};
const results: {
  [key: string]: {
    res: MediaQueryList;
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void;
  };
} = {};

export function responesScreen (func: SubscribeCb) {
  if (!subscribers.size) {
    register();
  }
  subUid += 1;
  subscribers.set(subUid, func);
  func({ ...screen });
  return subUid;
}

export function removeSubscribeCb (id: number) {
  subscribers.delete(id);
  if (subscribers.size === 0) {
    unRegister();
  }
}

function register () {
  Object.keys(screenMedias).forEach(key => {
    const result = window.matchMedia(screenMedias[key]);
    if (result.matches) {
      screen[key as ScreenMediasKey] = true;
      dispatch();
    }
    const listener = e => {
      screen[key as ScreenMediasKey] = e.matches;
      dispatch();
    };
    result.addEventListener('change', listener);

    results[key] = {
      res: result,
      listener
    };
  });
}

function unRegister () {
  Object.keys(screenMedias).forEach(key => {
    const handler = results[key];
    handler.res.removeEventListener('change', handler.listener);
  });
  subscribers.clear();
}

function dispatch () {
  subscribers.forEach(value => {
    value({ ...screen });
  });
}

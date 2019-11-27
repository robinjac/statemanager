
const entries = Object.entries;
const define = Object.defineProperty;

export default function stateFactory({ properties, observers }: StateInput): StateHandler | StateHandler[] {
    let subscribers: SubscriberMap = {};
    let notify: UpdaterMap = {};
    let stateHandler: StateHandler = {
        state: {},
        $subscribe: (stateNames: string[], updater: Updater): void => {
            stateNames.forEach(stateName => {
                if (!subscribers[stateName]) {
                    subscribers[stateName] = [];
                }
                subscribers[stateName].push(updater);
                notify[stateName] = subscribers[stateName].reduce((Fn, nextFn) => {
                    return (...args) => {
                        nextFn(...args);
                        Fn(...args);
                    }
                })
            });
        }
    };

    let silentState: StateProperties = {};
    entries(properties).forEach(<T>([key, value]: [string, T]) => {
        let pValue: T = value;

        if (!stateHandler.state[key]) {

            // This slice of state does not notify the observers, but changes the state.
            silentState = define(silentState, key, {
                get() {
                    return pValue;
                },
                set(newValue) {
                    pValue = newValue;
                },
                enumerable: true
            })

            stateHandler.state = define(stateHandler.state, key, {
                get(): T {
                    return pValue;
                },
                set(newValue: T) {
                    if (subscribers[key]) {
                        notify[key](key, newValue, pValue, silentState);
                    }
                    pValue = newValue;
                },
                enumerable: true
            })
        }
    });

    if (observers) {
        return new Array(observers).fill(stateHandler);
    } else {
        return stateHandler;
    }
}
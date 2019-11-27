interface StateProperties {
    [stateName: string]: any;
}

interface StateInput {
    properties: StateProperties;
    observers?: number;
}

interface UpdaterMap {
    [stateName: string]: Updater;
}

interface SubscriberMap {
    [stateName: string]: Updater[];
}

interface StateHandler {
    state: StateProperties;
    $subscribe: (stateNames: string[], updater: Updater) => void;
}

type Updater = (stateName: string, newValue: any, oldValue: any, state: StateProperties) => void;
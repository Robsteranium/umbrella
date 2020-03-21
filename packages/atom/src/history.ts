import {
    INotifyMixin,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8
} from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import { getIn, setIn, updateIn } from "@thi.ng/paths";
import { View } from "./view";
import type {
    Event,
    Listener,
    Path,
    Predicate2,
    Watch
} from "@thi.ng/api";
import type {
    IAtom,
    IHistory,
    IView,
    SwapFn,
    ViewTransform
} from "./api";

/**
 * Undo/redo history stack wrapper for atoms and cursors. Implements
 * {@link IAtom} interface and so can be used directly in place and
 * delegates to wrapped atom/cursor.
 *
 * @remarks
 * Value changes are only recorded in history if `changed` predicate
 * returns truthy value, or else by calling {@link History.record}
 * directly. This class too implements the {@link @thi.ng/api#INotify}
 * interface to support event listeners for {@link History.undo},
 * {@link History.redo} and {@link History.record}.
 */
@INotifyMixin
export class History<T> implements IHistory<T> {
    static readonly EVENT_UNDO = "undo";
    static readonly EVENT_REDO = "redo";
    static readonly EVENT_RECORD = "record";

    state: IAtom<T>;
    maxLen: number;
    changed: Predicate2<T>;

    history!: T[];
    future!: T[];

    /**
     * @param state - parent state
     * @param maxLen - max size of undo stack
     * @param changed - predicate to determine changed values (default `!equiv(a,b)`)
     */
    constructor(state: IAtom<T>, maxLen = 100, changed?: Predicate2<T>) {
        this.state = state;
        this.maxLen = maxLen;
        this.changed = changed || ((a, b) => !equiv(a, b));
        this.clear();
    }

    get value() {
        return this.deref();
    }

    set value(val: T) {
        this.reset(val);
    }

    canUndo() {
        return this.history.length > 0;
    }

    canRedo() {
        return this.future.length > 0;
    }

    /**
     * Clears history & future stacks
     */
    clear() {
        this.history = [];
        this.future = [];
    }

    /**
     * Attempts to re-apply most recent historical value to atom and
     * returns it if successful (i.e. there's a history).
     *
     * @remarks
     * Before the switch, first records the atom's current value into
     * the future stack (to enable {@link History.redo} feature).
     * Returns `undefined` if there's no history.
     *
     * If undo was possible, the `History.EVENT_UNDO` event is emitted
     * after the restoration with both the `prev` and `curr` (restored)
     * states provided as event value (and object with these two keys).
     * This allows for additional state handling to be executed, e.g.
     * application of the "Command pattern". See
     * {@link History.addListener} for registering event listeners.
     */
    undo() {
        if (this.history.length) {
            const prev = this.state.deref();
            this.future.push(prev);
            const curr = this.state.reset(this.history.pop()!);
            this.notify({ id: History.EVENT_UNDO, value: { prev, curr } });
            return curr;
        }
    }

    /**
     * Attempts to re-apply most recent value from future stack to atom
     * and returns it if successful (i.e. there's a future).
     *
     * @remarks
     * Before the switch, first records the atom's current value into
     * the history stack (to enable {@link History.undo} feature).
     * Returns `undefined` if there's no future (so sad!).
     *
     * If redo was possible, the `History.EVENT_REDO` event is emitted
     * after the restoration with both the `prev` and `curr` (restored)
     * states provided as event value (and object with these two keys).
     * This allows for additional state handling to be executed, e.g.
     * application of the "Command pattern". See
     * {@link History.addListener} for registering event listeners.
     */
    redo() {
        if (this.future.length) {
            const prev = this.state.deref();
            this.history.push(prev);
            const curr = this.state.reset(this.future.pop()!);
            this.notify({ id: History.EVENT_REDO, value: { prev, curr } });
            return curr;
        }
    }

    /**
     * `IReset.reset()` implementation. Delegates to wrapped
     * atom/cursor, but too applies `changed` predicate to determine if
     * there was a change and if the previous value should be recorded.
     *
     * @param val - replacement value
     */
    reset(val: T) {
        const prev = this.state.deref();
        this.state.reset(val);
        const changed = this.changed(prev, this.state.deref());
        if (changed) {
            this.record(prev);
        }
        return val;
    }

    resetIn<A extends Keys<T>>(path: readonly [A], val: Val1<T, A>): T;
    resetIn<A extends Keys<T>, B extends Keys1<T, A>>(
        path: readonly [A, B],
        val: Val2<T, A, B>
    ): T;
    resetIn<A extends Keys<T>, B extends Keys1<T, A>, C extends Keys2<T, A, B>>(
        path: readonly [A, B, C],
        val: Val3<T, A, B, C>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>
    >(path: readonly [A, B, C, D], val: Val4<T, A, B, C, D>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>
    >(path: readonly [A, B, C, D, E], val: Val5<T, A, B, C, D, E>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>
    >(path: readonly [A, B, C, D, E, F], val: Val6<T, A, B, C, D, E, F>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>
    >(
        path: readonly [A, B, C, D, E, F, G],
        val: Val7<T, A, B, C, D, E, F, G>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H],
        val: Val8<T, A, B, C, D, E, F, G, H>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]], val: any): T;
    resetIn(path: Readonly<Path>, val: any) {
        const prev = this.state.deref();
        const prevV = getIn(prev, path);
        const curr = setIn(prev, path, val);
        this.state.reset(curr);
        this.changed(prevV, getIn(curr, path)) && this.record(prev);
        return curr;
    }

    /**
     * `ISwap.swap()` implementation. Delegates to wrapped atom/cursor,
     * but too applies `changed` predicate to determine if there was a
     * change and if the previous value should be recorded.
     *
     * @param fn - update function
     * @param args - additional args passed to `fn`
     */
    swap(fn: SwapFn<T>, ...args: any[]): T {
        return this.reset(fn(this.state.deref(), ...args));
    }

    swapIn<A extends Keys<T>>(
        path: readonly [A],
        fn: SwapFn<Val1<T, A>>,
        ...args: any[]
    ): T;
    swapIn<A extends Keys<T>, B extends Keys1<T, A>>(
        path: readonly [A, B],
        fn: SwapFn<Val2<T, A, B>>,
        ...args: any[]
    ): T;
    swapIn<A extends Keys<T>, B extends Keys1<T, A>, C extends Keys2<T, A, B>>(
        path: readonly [A, B, C],
        fn: SwapFn<Val3<T, A, B, C>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>
    >(
        path: readonly [A, B, C, D],
        fn: SwapFn<Val4<T, A, B, C, D>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>
    >(
        path: readonly [A, B, C, D, E],
        fn: SwapFn<Val5<T, A, B, C, D, E>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>
    >(
        path: readonly [A, B, C, D, E, F],
        fn: SwapFn<Val6<T, A, B, C, D, E, F>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>
    >(
        path: readonly [A, B, C, D, E, F, G],
        fn: SwapFn<Val7<T, A, B, C, D, E, F, G>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H],
        fn: SwapFn<Val8<T, A, B, C, D, E, F, G, H>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]],
        fn: SwapFn<any>,
        ...args: any[]
    ): T;
    swapIn(path: Readonly<Path>, fn: SwapFn<any>, ...args: any[]) {
        const prev = this.state.deref();
        const prevV = getIn(prev, path);
        const curr = updateIn(this.state.deref(), path, fn, ...args);
        this.state.reset(curr);
        this.changed(prevV, getIn(curr, path)) && this.record(prev);
        return curr;
    }

    /**
     * Records given state in history. This method is only needed when
     * manually managing snapshots, i.e. when applying multiple swaps on
     * the wrapped atom directly, but not wanting to create an history
     * entry for each change.
     *
     * @remarks
     * **DO NOT call this explicitly if using {@link History.reset} /
     * {@link History.swap} etc.**
     *
     * If no `state` is given, uses the wrapped atom's current state
     * value (user code SHOULD always call without arg).
     *
     * If recording succeeded, the `History.EVENT_RECORD` event is
     * emitted with the recorded state provided as event value.
     *
     * @param state - state to record
     */
    record(state?: T) {
        const history = this.history;
        const n = history.length;
        let ok = true;
        // check for arg given and not if `state == null` we want to
        // allow null/undefined as possible values
        if (!arguments.length) {
            state = this.state.deref();
            ok = !n || this.changed(history[n - 1], state);
        }
        if (ok) {
            if (n >= this.maxLen) {
                history.shift();
            }
            history.push(state!);
            this.notify({ id: History.EVENT_RECORD, value: state });
            this.future.length = 0;
        }
    }

    /**
     * Returns wrapped atom's **current** value.
     */
    deref(): T {
        return this.state.deref();
    }

    /**
     * `IWatch.addWatch()` implementation. Delegates to wrapped
     * atom/cursor.
     *
     * @param id - watch ID
     * @param fn - watch function
     */
    addWatch(id: string, fn: Watch<T>) {
        return this.state.addWatch(id, fn);
    }

    /**
     * `IWatch.removeWatch()` implementation. Delegates to wrapped
     * atom/cursor.
     *
     * @param id - watch iD
     */
    removeWatch(id: string) {
        return this.state.removeWatch(id);
    }

    /**
     * `IWatch.notifyWatches()` implementation. Delegates to wrapped
     * atom/cursor.
     *
     * @param oldState -
     * @param newState -
     */
    notifyWatches(oldState: T, newState: T) {
        return this.state.notifyWatches(oldState, newState);
    }

    addView<V>(path: Path, tx?: ViewTransform<V>, lazy = true): IView<V> {
        return new View<V>(this, path, tx, lazy);
    }

    release() {
        this.state.release();
        delete this.state;
        return true;
    }

    /** {@inheritDoc @thi.ng/api#INotify.addListener} */
    // @ts-ignore: mixin
    addListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
    // @ts-ignore: mixin
    removeListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.notify} */
    // @ts-ignore: mixin
    notify(e: Event): void {}
}

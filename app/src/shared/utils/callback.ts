export default interface Callback<Params extends [] = [], Return = any> {
    (...args: Params): Return;
}
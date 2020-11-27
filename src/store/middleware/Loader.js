import * as dynamicActions from "../dynamicui/actions";
import * as vkActions from '../vkdata/actions'

export function LoaderMiddleware({dispatch, getState}) {
    return function (next) {
        return function (action) {
            try {
                if (Object.keys(getState().vk_data.bridge).length > 0
                    && !action.type.includes('SUBSCRIBE_EVENTS')) {
                    dispatch(vkActions.subscribeVKEvents.saga())
                }
                if (action.type.includes('SAGA')) {
                    dispatch(dynamicActions.showLoader())
                }
                if (action.type.includes('TOAST')
                    || action.type.includes('PUSH_TO_HISTORY')
                    || action.type.includes('SET')) {
                    dispatch(dynamicActions.hideLoader())
                }
            } catch (e) {
            }
            return next(action)
        }
    }
}

import * as types from '../actions/types';

const defaultState = {
  providers: [],
  loadProviders: { isLoading: false, loadStatus: null },
  linkProvider: { isLinking: false, linkStatus: null }
};

function providers(state = defaultState, action) {
  switch (action.type) {
  case types.PROVIDERS_REQUEST:
    return {
      ...state,
      loadProviders: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_PROVIDERS_SUCCESS:
    return {
      ...state,
      providers: action.providers,
      loadProviders: { isLoading: false, loadStatus: 'success' }
    };
  case types.LOAD_PROVIDERS_FAILURE:
    return {
      ...state,
      loadProviders: { isLoading: false, loadStatus: 'failure' }
    };
  case types.LINK_PROVIDER_REQUEST:
    return {
      ...state,
      linkProvider: { isLinking: true, linkStatus: null }
    };
  case types.LINK_PROVIDER_SUCCESS:
    window.location.assign(action.redirectUri);

    return {
      ...state,
      linkProvider: { isLinking: false, linkStatus: 'success' }
    };
  case types.OAUTH_CALLBACK_SUCCESS:
    window.location.assign(action.redirectUri);

    return state;
  case types.LINK_PROVIDER_FAILURE:
    return {
      ...state,
      linkProvider: { isLinking: false, linkStatus: 'failure' }
    };
  default:
    return state;
  }
}

export default providers;

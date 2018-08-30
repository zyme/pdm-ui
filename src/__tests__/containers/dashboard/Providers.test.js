import { fullRenderContainer } from '../../../utils/testHelpers';
import Providers from '../../../containers/dashboard/Providers';
import { profileMockA } from '../../../__mocks__/profileMocks';
import { providerMockA, providerMockB, providerMockC, providerMockD } from '../../../__mocks__/providerMocks';
import { profileProviderMockA, profileProviderMockB } from '../../../__mocks__/profileProviderMocks';

function setup(providers = [], profileProviders = []) {
  const store = {
    profiles: { activeProfile: profileMockA },
    providers: { providers, profileProviders }
  };

  const props = {
    linkProviders: jest.fn(),
    loadProfileProviders: jest.fn()
  };

  return fullRenderContainer(Providers, props, store);
}

it('renders self and self components', () => {
  const providers = [providerMockA, providerMockB, providerMockC];
  const profileProviders = [profileProviderMockA, profileProviderMockB];
  const component = setup(providers, profileProviders);

  expect(component).toBeDefined();
  expect(component.find('div.providers')).toExist();
});

it.only('renders all providers', () => {
  const providers = [providerMockA, providerMockB, providerMockC, providerMockD];
  const profileProviders = [profileProviderMockA, profileProviderMockB];
  const component = setup(providers, profileProviders);

  expect(component.find('div.providers-list')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
  expect(component.find('div.provider-card')).toHaveLength(2);
  expect(component.find('div.provider-card__titlebar-name').at(0).text()).toEqual('FitBit');
  expect(component.find('div.provider-card__titlebar-name').at(1).text()).toEqual('Blue Cross Blue Shield');
});

it('displays no entries message if there are no provider profiles', () => {
  const component = setup([], [profileProviderMockA, profileProviderMockB]);

  expect(component.find('div.providers-list')).toExist();
  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.provider-card')).toHaveLength(0);
});

it('displays the correct images for each provider', () => {
  const providers = [providerMockA, providerMockB, providerMockC, providerMockD];
  const component = setup(providers);

  component.find('div.provider-card__titlebar-icon').at(0).find('svg').simulate('click');
  expect(component.find('img.details-logo__img').at(0).prop('src'))
    .toEqual('/assets/images/provider-logos/fitbit.png');

  component.find('div.provider-card__titlebar-icon').at(1).find('svg').simulate('click');
  expect(component.find('img.details-logo__img').at(1).prop('src'))
    .toEqual('/assets/images/provider-logos/mgh.png');

  component.find('div.provider-card__titlebar-icon').at(2).find('svg').simulate('click');
  expect(component.find('img.details-logo__img').at(2).prop('src'))
    .toEqual('/assets/images/provider-logos/partners-healthcare.png');

  component.find('div.provider-card__titlebar-icon').at(3).find('svg').simulate('click');
  expect(component.find('img.provider-card__details').at(3).find('img.details-logo__img')).toHaveLength(0);
});

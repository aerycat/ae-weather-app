// import 'react-native';
import React from 'react';
import Index from '../src/aeWeatherApp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('StatusBar', () => 'StatusBar')

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});

afterAll(() => setTimeout(() => process.exit(), 1000));

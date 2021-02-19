import {Colors} from './Colors';
import {Dimens} from './Dimens';

// ------------------------ Text elements --------------------

// --- SinglePost header
const bigHeader = {
  fontSize: Dimens.fontSizes.bigHeader,
  backgroundColor: Colors.white,
  color: Colors.darkGreen,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  borderBottomLeftRadius: 10,
  borderTopRightRadius: 10,
  elevation: Dimens.elevations.baseElevation,
};

// All header need to be inside <View> tag which implements this style.
// Wraps the header width to match content
const headerContainer = {
  alignSelf: 'baseline',
  marginLeft: 25,
};

// ------------------------ Basic building blocks --------------

const cardLayout = {
  backgroundColor: Colors.white,
  borderRadius: 20,
  elevation: Dimens.elevations.baseElevation,
};

export {bigHeader, headerContainer, cardLayout};

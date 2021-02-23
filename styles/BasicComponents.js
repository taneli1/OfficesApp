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
  paddingLeft: 15,
  paddingRight: 15,
  borderBottomLeftRadius: 10,
  borderTopRightRadius: 10,
  borderColor: Colors.primary,
  borderWidth: 1,
  elevation: Dimens.elevations.baseElevation,
};

const smallHeader = {
  fontSize: Dimens.fontSizes.textSmall,
  backgroundColor: Colors.white,
  color: Colors.primary,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 15,
  paddingRight: 15,
  borderBottomRightRadius: 10,
  borderTopLeftRadius: 10,
  borderColor: Colors.primary,
  borderWidth: 1,
  elevation: Dimens.elevations.baseElevation,
};

// All headers above need to be inside <View> tag which implements this style.
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

export {bigHeader, smallHeader, headerContainer, cardLayout};

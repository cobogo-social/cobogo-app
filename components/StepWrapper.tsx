import PropTypes from 'prop-types';

export default function StepWrapper({ children }) {
  return (
    <div className="flex flex-row justify-between items-start pl-16 sm:px-16 2xl:px-64 mt-32 sm:mt-0">
      {children}
    </div>
  );
}
StepWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

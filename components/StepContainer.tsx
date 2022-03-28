import PropTypes from 'prop-types';

export default function StepContainer({ children }) {
  return (
    <div className="w-full h-full p-8">
      {children}
    </div>
  );
}
StepContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

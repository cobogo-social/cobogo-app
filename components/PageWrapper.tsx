import PropTypes from 'prop-types';

export default function PageWrapper({ children }) {
  return (
    <div className="grid grid-rows-1 sm:grid-rows-[1080px_70px] grid-cols-1 sm:grid-cols-[332px_1fr]">
      {children}
    </div>
  );
}
PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

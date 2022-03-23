import PropTypes from 'prop-types';

export default function PageWrapper({ children }) {
  return (
    <div className="grid grid-rows-1 sm:grid-rows-[1520px_70px] md:grid-rows-[1265px_70px] lg:grid-rows-[930px_70px] xl:grid-rows-[780px_70px] 2xl:grid-rows-[1145px_70px] grid-cols-1 sm:grid-cols-[332px_1fr]">
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

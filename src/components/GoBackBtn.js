import PropTypes from 'prop-types';

export default function GoBackBtn({ onBackClick }) {
  return (
    <button
      type="submit"
      onClick={onBackClick}
      style={{
        margin: '50px 0 50px 30px',
        padding: '10px 20px',
        textTransform: 'uppercase',
      }}
    >
      Go back
    </button>
  );
}

GoBackBtn.propTypes = {
  onBackClick: PropTypes.func,
};

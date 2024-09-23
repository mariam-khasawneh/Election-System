// import PropTypes from "prop-types";

// const ButtonGroup = ({ buttons }) => {
//   return (
//     <div className="inline-flex rounded-md shadow-sm" role="group">
//       {buttons.map((button, index) => (
//         <button
//           key={button.id}
//           type="button"
//           onClick={button.onClick}
//           className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-700 ${
//             index === 0
//               ? "rounded-s-lg"
//               : index === buttons.length - 1
//               ? "rounded-e-lg"
//               : ""
//           } hover:bg-gray-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-700 focus:text-white`}
//         >
//           {button.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// ButtonGroup.propTypes = {
//   buttons: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       label: PropTypes.string.isRequired,
//       onClick: PropTypes.func.isRequired,
//     })
//   ).isRequired,
// };
// export default ButtonGroup;

import PropTypes from "prop-types";

const ButtonGroup = ({ buttons, activeButtonId }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {buttons.map((button, index) => (
        <button
          key={button.id}
          type="button"
          onClick={button.onClick}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-700 ${
            index === 0
              ? "rounded-s-lg"
              : index === buttons.length - 1
              ? "rounded-e-lg"
              : ""
          } ${
            button.id === activeButtonId
              ? "bg-gray-700 text-white cursor-not-allowed"
              : "text-gray-600 bg-transparent hover:bg-gray-700 hover:text-white"
          } focus:z-10 focus:ring-2 focus:ring-gray-500`}
          disabled={button.id === activeButtonId}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  activeButtonId: PropTypes.number.isRequired, // Added prop type for activeButtonId
};

export default ButtonGroup;

import React from 'react';


function Button(props: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  return (
    <div className="flex justify-center items-center">
      <button className="border border-gray-500 rounded-lg bg-transparent px-5 py-2 hover:bg-gray-500 hover:text-white transition duration-300">
        {props.name}
      </button>
    </div>
  );
}


Button.defaultProps = {
  name: "Let's Start",
};

export default Button;

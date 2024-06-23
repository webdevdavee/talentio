type LoaderProp = {
  className: string;
};

const Loader2 = ({ className }: LoaderProp) => {
  return <span className={className}></span>;
};

export default Loader2;

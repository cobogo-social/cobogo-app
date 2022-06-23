interface CopyIconProps {
  size: number;
}

export default function CopyIcon(props: CopyIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.size}
      fill="none"
      viewBox="0 0 18 18"
    >
      <path fill="url(#pattern0)" fillOpacity="0.5" d="M0 0H18V18H0z" />
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.01042)" xlinkHref="#image0_3161_1155" />
        </pattern>
        <image
          id="image0_3161_1155"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACRElEQVR4nO3cMW4TQQBG4TcEQQFnAHpAnIFAinANIlFzEUBCIJDgHEgEOAMF9IgjoNAghaGwC5pkx5Cdf+N5X5txdj3Pu449yoAkSZKk0ZRNH1BrvQ0cAPeAG8CVsz6pJSmlbDxHm7jYOrDWehl4CjwCLsx2RoNpCrCe/HfA3XlPZzytr+RnOPmzmLy/re/5nxn0tjP3e0DLpB40jtM/aJnY+7OfxcBaAlyb/SwG1vIeUE/9BTPfI7ed9/YwA4QZIMwAYQYIM0CYAcKav44+K1u4nvAT+AZ8AN6UUr5s8uBuH8QGWU/4DbwCHpdSfrU8oEuAAdcTPgH7LRF6vRJHW0/YBZ60DJz9Chh4PeEYuFNK+XraoB6TMup6wg7wcGpQj4kZeT1hb2pAjwAjrydcnxrQ4z1gq9cT/vf5jXhvXhQDhBkgzABhBggzQJgBwgwQZoAwA4QZIMwAYQYIM0CYAcIMEGaAMAOEGSDMAGEGCDNAmAHCDBBmgDADhBkgzABhBggzQJgBwgwQZoAwA4QZIMwAYQYIM0CYAcIm9ws67//Hu3ReAWEGCDNAmAHCDBBmgDADhPXYN/QIuHrSD6f22znnfkwN6HEFfO9wjKWafO49Ahx2OMZSvZ8aMPvXDLXWW6y2rdyZ+1gLs4xtK9d7Kb+e+zgL9HJq8qHDFQBQa73Eauvi3R7HW4CPwIPFbF28PpF94AWrS3NbHQPPaZx86HQF/K3WepPVjrJ7rLavP/FP1HPiiNX29YfA25bbjiRJkqSx/QGCkXIdu6Q0SAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
}

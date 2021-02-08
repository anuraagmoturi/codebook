import '../css/resizable.css'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [initialWidth, setInitialWidth] = useState(window.innerWidth * 0.75);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timer: any;
    const listner = () => {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < initialWidth)
          setInitialWidth(window.innerWidth * 0.75);
      }, 100);

    }
    window.addEventListener('resize', listner);

    return () => {
      window.removeEventListener('resize', listner);
    };
  }, [initialWidth])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: initialWidth,
      resizeHandles: ['e'],
      maxConstraints: [width * 0.75, Infinity],
      minConstraints: [width * 0.2, Infinity],
      onResizeStop: (e, data) => setInitialWidth(data.size.width)
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 30]
    }
  }
  return <ResizableBox
    {...resizableProps}
  >
    {children}
  </ResizableBox>
}

export default Resizable;
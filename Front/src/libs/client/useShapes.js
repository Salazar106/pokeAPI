import * as fabric from 'fabric';

export function useShapes(canvas) {
  const addShape = (shape,shapeColor) => {
    let fabricShape;
    const baseProperties = {
      left: 100,
      top: 100,
      selectable: true,
      evented: true,
    };

    switch (shape) {
      case 'circle':
        fabricShape = new fabric.Circle({
          ...baseProperties,
          radius: 50,
          fill: shapeColor, 
          customType: 'circle',
        });
        break;
      case 'square':
        fabricShape = new fabric.Rect({
          ...baseProperties,
          width: 100,
          height: 100,
          fill: shapeColor,
          customType: 'square', 
        });
        break;
        case 'star':
          fabricShape = new fabric.Polygon(
            [
              { x: 50, y: 0 },
              { x: 60, y: 35 },
              { x: 95, y: 35 },
              { x: 65, y: 57 },
              { x: 75, y: 90 },
              { x: 50, y: 70 },
              { x: 25, y: 90 },
              { x: 35, y: 57 },
              { x: 5, y: 35 },
              { x: 40, y: 35 },
            ],
            {
              ...baseProperties,
              fill: shapeColor,
              objectCaching: false,
              customType: 'star',
            }
          );
          break;
        
      case 'triangle':
        fabricShape = new fabric.Triangle({
          ...baseProperties,
          width: 100,
          height: 100,
          fill: shapeColor, 
          customType: 'triangle',
        });
        break;
      case 'apple':
        fabricShape = new fabric.Path('M 150 200 C 120 165, 120 120, 180 115 C 210 90, 240 100, 250 115 C 275 165, 260 200, 212 200 C 180 220, 160 210, 150 200 Z'
, {
          ...baseProperties,
          fill: shapeColor, 
          customType: 'apple',
        });
        break;
      case 'target':
        fabricShape = new fabric.Circle({
          ...baseProperties,
          radius: 50,
          fill: 'transparent',
          stroke: 'black',
          strokeWidth: 5,
          customType: 'target',
        });
        fabricShape.set('radius', 30);
        fabricShape.set('fill', 'black');
        fabricShape.set('radius', 10);
        fabricShape.set('fill', 'white');
        break;
        case 'line':
          fabricShape = new fabric.Rect({
            ...baseProperties,
            width:100,
            height: 5,
            fill: shapeColor,
            customType: 'line', 
          });
          break;
      default:
        return;
    }

    if (fabricShape && canvas) {
      canvas.add(fabricShape);
      canvas.renderAll();
    }
  };

  return { addShape };
}
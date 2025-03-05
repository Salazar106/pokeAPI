import { useEffect } from 'react';
import * as fabric from 'fabric';

const useCanvas = (
  canvasRef,
  setCanvas,
  setShapeColor,
  setSelectedFont,
  setSelectedColor,
  letterSpacing,
  setLetterSpacing,
  canvas
) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas2 = new fabric.Canvas(canvasRef.current, {
      width: 385,
      height: 400,
    });

    // Evitar que objetos salgan del canvas
    canvas2.on('object:moving', (options) => {
      const obj = options.target;
      const canvasWidth = canvas2.getWidth();
      const canvasHeight = canvas2.getHeight();

      if (obj.left < 0) obj.set('left', 0);
      if (obj.top < 0) obj.set('top', 0);
      if (obj.left + obj.width * obj.scaleX > canvasWidth) obj.set('left', canvasWidth - obj.width * obj.scaleX);
      if (obj.top + obj.height * obj.scaleY > canvasHeight) obj.set('top', canvasHeight - obj.height * obj.scaleY);
    });

    canvas2.on('selection:cleared', () => {
      setShapeColor('#000000');
    });

    setCanvas(canvas2);

    return () => {
      canvas2.dispose();
    };
  }, [canvasRef, setCanvas, setShapeColor]);

  useEffect(() => {
    if (!canvas) return;

    const updateSelectedObject = () => {
      const activeObject = canvas.getActiveObject();

      if (activeObject) {
        if (activeObject.type === 'textbox') {
          setSelectedFont(activeObject.fontFamily || 'Arial');
          setSelectedColor(activeObject.fill || '#000000');
        } else if (
          ['circle', 'star', 'triangle', 'square', 'target'].includes(activeObject.type)
        ) {
          setShapeColor(activeObject.fill || '#000000');
        } else {
          setSelectedFont('');
          setSelectedColor('');
          setShapeColor('#000000');
        }
      } else {
        setSelectedFont('');
        setSelectedColor('');
        setShapeColor('#000000');
      }
    };

    canvas.on('selection:created', updateSelectedObject);
    canvas.on('selection:updated', updateSelectedObject);
    canvas.on('selection:cleared', updateSelectedObject);

    return () => {
      canvas.off('selection:created', updateSelectedObject);
      canvas.off('selection:updated', updateSelectedObject);
      canvas.off('selection:cleared', updateSelectedObject);
    };
  }, [canvas, setSelectedFont, setSelectedColor, setShapeColor]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && canvas) {
        const activeObjects = canvas.getActiveObjects();

        if (activeObjects.length > 0) {
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });

          canvas.discardActiveObject();
          setTimeout(() => {
            canvas.renderAll();
          }, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);

};

export default useCanvas;
import * as fabric from 'fabric';

export function decoTabLogic(canvas, setSelectedFont, setSelectedColor, setUploadedImg) {
  const handleFontChange = (e) => {
    const font = e.target.value;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set('fontFamily', font);
      setSelectedFont(font); // Actualiza el estado en el componente padre
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set('fill', color);
      setSelectedColor(color); // Actualiza el estado en el componente padre
      canvas.renderAll();
    }
  };

  const addText = () => {
    if (!canvas) {
      console.log("Canvas no disponible");
      return;
    }

    const text = new fabric.Textbox('Texto', {
      left: 50,
      top: 50,
      fontFamily: 'Arial',
      fill: '#000000',
      fontSize: 20,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file && canvas) {
      setUploadedImg(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          console.log('Image loaded:', img);

          const imgWidth = img.width;
          const imgHeight = img.height;
          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();

          let scale = 1;
          if (imgWidth > canvasWidth && imgHeight > canvasHeight) {
            const scaleX = canvasWidth / imgWidth;
            const scaleY = canvasHeight / imgHeight;
            scale = Math.min(scaleX, scaleY);
          }

          const fabricImage = new fabric.Image(img, {
            left: (canvasWidth - imgWidth * scale) / 2,
            top: (canvasHeight - imgHeight * scale) / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: true,
            evented: true,
          });

          console.log('Fabric image created:', fabricImage);
          canvas.add(fabricImage);
          canvas.renderAll();
          console.log('Image added to canvas');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    handleFontChange,
    handleColorChange,
    addText,
    handleImgUpload
  };
}

/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const PriceContext = createContext();

// Crear un proveedor de contexto
export const PriceProvider = ({ children }) => {

  const [isCotization, setIsCotization] = useState(false)

//*--------------------------------------------*//
//*                 prices                    *//  
  const [idTemplate, setIdTemplate] = useState()
  const [boxAmount, setBoxAmount] = useState(1)
  const [tubeAmount, setTubeAmount] = useState(30)
  const [tubes, setTubes]= useState(0)
  const [tubesIva, setTubesIva] = useState(0)
  const [decorator, setDecorator] = useState(0)
  const [decoratorIva, setDecoratorIva] = useState(0)
  const [subTotalIva, setSubTotalIva]= useState(0)
  const [subTotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
//*--------------------------------------------*//


//?--------------------------------------------*//
//?               Tube design                 *//  
  const [stageColor, setStageColor] = useState("#f5f5f5");
  const [tubeColor, setTubeColor] = useState("#F6F6F6");
  const [capColor, setCapColor] = useState("#F6F6F6");
  const [tubeSize, setTubeSize] = useState({ diameter: "30", volume: "50", length: "120", });
  const [tubeAmountselected, setTubeAmountselected] = useState(30)
  const [tubePrice, setTubePrice] = useState(3000)
  const [boxPrice, setBoxPrice] = useState()
  const [tubeMaterial, setTubeMaterial] = useState({ roughness: 0.8, metalness: 0, clearcoat: 0, clearcoatRoughness: 0 });
  const [tubeSealing, setTubeSealing] = useState("Sin Sellar");
  const [PantoneCap, setPantoneCap] = useState("666F6d");
  const [PantoneTube, setPantoneTube] = useState("666F6d");
  const [decoratorType, setDecoratorType] = useState();
  const [decorator_price, setDecoratorPrice] = useState(0)
  const [decoratorImgUrl, setDecoratorImgUrl] = useState(null)
  const [canvaDecorator, setCanvaDecorator] = useState({})
  //?--------------------------------------------*//

  //?--------------------------------------------*//
  //?               DecoradorTab               *//  
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeColor, setShapeColor] = useState('#000000');
  const [canvas, setCanvas] = useState(null);
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [letterSpacing, setLetterSpacing] = useState(0);  
// *Funtion to clear the states to create a new template
const handleRefreshTable = () => {
  setDecoratorImgUrl()
  setIdTemplate(null);
  setPantoneCap("666F6d");
  setPantoneTube("666F6d");
  setTubeSealing("Sin Sellar");
  setStageColor("#f5f5f5");
  setTubeColor("#F6F6F6");
  setCapColor("#F6F6F6");
  setTubeSize({ diameter: "30", volume: "50", length: "120" });
  setTubeAmountselected(30);
  setTubePrice(3000);
  setBoxPrice();
  setTubeMaterial({
    roughness: 0.8,
    metalness: 0,
    clearcoat: 0,
    clearcoatRoughness: 0,
  });
  setDecoratorType();
  setCanvaDecorator({})
  setIsCotization(false)

  setIsDisabled(false);
  setUploadedFile("");
  if (canvas) {
    canvas.clear();
  }
};

  useEffect(() => {
    setTubesIva(tubes * 0.19)
    setDecoratorIva(decorator * 0.19)
    setSubtotal(tubes+decorator)
    setSubTotalIva(subTotal * 0.19)
    
    setTotal(subTotal+subTotalIva+decorator+decoratorIva)
  }, [tubes,subTotal,decorator]);

  return (
    <PriceContext.Provider value={{ 
        tubes,
        setTubes,
        tubesIva,
        setTubesIva,
        decorator,
        setDecorator,
        decoratorIva,
        setDecoratorIva,
        subTotalIva,
        setSubTotalIva,
        subTotal,
        setSubtotal,
        total,
        setTotal,
        boxAmount,
        setBoxAmount,
        tubeAmount,
        setTubeAmount,
        idTemplate,
        setIdTemplate,
        stageColor,
        setStageColor,
        tubeColor,
        setTubeColor,
        capColor,
        setCapColor,
        tubeSize,
        setTubeSize,
        tubeAmountselected,
        setTubeAmountselected,
        tubePrice,
        setTubePrice,
        boxPrice,
        setBoxPrice,
        tubeMaterial,
        setTubeMaterial,
        tubeSealing,
        setTubeSealing,
        PantoneCap,
        setPantoneCap,
        PantoneTube,
        setPantoneTube,
        decoratorType,
        setDecoratorType,
        decorator_price,
        setDecoratorPrice,
        decoratorImgUrl,
        setDecoratorImgUrl,
        handleRefreshTable,
        isCotization,
        setIsCotization,
        canvaDecorator,
        setCanvaDecorator,
        isDisabled, 
        setIsDisabled,
        uploadedFile, 
        setUploadedFile,
        uploadedImg, 
        setUploadedImg,
        selectedShape, 
        setSelectedShape,
        shapeColor, 
        setShapeColor,
        canvas, 
        setCanvas,
        selectedFont, 
        setSelectedFont,
        selectedColor, 
        setSelectedColor,
        letterSpacing, 
        setLetterSpacing 
      }}>
      {children}
    </PriceContext.Provider>
  );
};

// Hook para usar el contexto
export const usePrice = () => {
  return useContext(PriceContext);
};

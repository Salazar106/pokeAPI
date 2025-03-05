// src/utils/UsecanvasStateUtils.js
import { useEffect } from "react";
import { toast } from "sonner";
import LZString from "lz-string";

const UsecanvasStateUtils = (canvas, setCanvaDecorator, canvaDecorator) => {
  useEffect(() => {
    if (!canvas) return;

    let saveTimer;

    const saveCanvasState = () => {
      try {
        const state = canvas.toJSON();
        const compressedState = LZString.compressToBase64(JSON.stringify(state));
        setCanvaDecorator({ state: compressedState });
        console.log("Estado del canvas guardado automáticamente.");
      } catch (error) {
        console.error("Error al guardar automáticamente el estado del canvas:", error);
      }
    };

    const handleCanvasChange = () => {
      if (saveTimer) clearTimeout(saveTimer);

      saveTimer = setTimeout(() => {
        saveCanvasState();
      }, 2000);
    };

    canvas.on("object:modified", handleCanvasChange);
    canvas.on("object:added", handleCanvasChange);

    return () => {
      if (saveTimer) clearTimeout(saveTimer);
      canvas.off("object:modified", handleCanvasChange);
      canvas.off("object:added", handleCanvasChange);
    };
  }, [canvas, setCanvaDecorator]);

  const loadCanvasState = () => {
    if (!canvas) {
      toast.warning("Canvas no inicializado. No se puede cargar el estado.");
      return;
    }

    try {
      if (canvaDecorator && canvaDecorator.state) {
        const { state } = canvaDecorator;

        const decompressedState = JSON.parse(LZString.decompressFromBase64(state));
        canvas.clear();
        canvas.backgroundColor = "#f3f3f3";
        canvas.loadFromJSON(decompressedState, () => {
          canvas.renderAll();
          canvas.requestRenderAll();
        });
        console.log("Estado del canvas cargado correctamente.");
      } else {
        console.warn("No se encontró un estado guardado en el contexto.");
      }
    } catch (error) {
      console.error("Error al cargar el estado del canvas:", error);
    }
  };

  useEffect(() => {
    if (canvaDecorator && canvaDecorator.state) {
      loadCanvasState();
    }
  }, [canvaDecorator, canvas]);

  return { loadCanvasState };
};

export default UsecanvasStateUtils;







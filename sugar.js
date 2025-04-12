async function connectDevice() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'Gluco' }],
        optionalServices: ['health_thermometer', 'battery_service'] // sample UUIDs
      });
  
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('health_thermometer');
      const characteristic = await service.getCharacteristic('temperature_measurement');
  
      const value = await characteristic.readValue();
      const glucose = value.getUint8(1); // simplified; real data format varies
  
      document.getElementById("readingText").innerText = `Glucose Level: ${glucose} mg/dL`;
  
    } catch (error) {
      alert("Connection failed: " + error);
    }
  }
  let port;
  async function connectSerial() {
    try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
  
      const reader = port.readable.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const glucoseLevel = new TextDecoder().decode(value).trim();
        document.getElementById("readingText").innerText = `Real-time Glucose: ${glucoseLevel} mg/dL`;
      }
    } catch (e) {
      alert("Serial error: " + e);
    }
  }
    
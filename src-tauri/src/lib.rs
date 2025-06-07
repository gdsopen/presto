use escpos::driver::*;
use escpos::printer::Printer;
use escpos::utils::*;

#[derive(Debug, Clone, serde::Serialize)]
struct DeviceInfo {
    vendor_id: u16,
    device_id: u16,
    name: String,
}

#[tauri::command]
fn get_usb_devices() -> Vec<DeviceInfo> {
    let mut devices: Vec<DeviceInfo> = vec![];
    
    if let Ok(device_list) = nusb::list_devices() {
        for device in device_list {
            let vendor_id = device.vendor_id();
            let device_id = device.product_id();
            let name = device.product_string().unwrap_or_default();
            devices.push(DeviceInfo {
                vendor_id,
                device_id,
                name: name.to_string(),
            });
        }
    }
    
    devices
}

#[tauri::command]
fn test(vendor_id: u16, device_id: u16) -> Result<(), String> {
    let driver = NativeUsbDriver::open(vendor_id, device_id).map_err(|e| e.to_string())?;
    let protocol = Protocol::default();
    let mut printer = Printer::new(driver, protocol, None);
    let printer = printer.init().map_err(|e| e.to_string())?;
    printer
        .bold(true)
        .and_then(|p| p.underline(UnderlineMode::Single))
        .and_then(|p| p.font(Font::A))
        .and_then(|p| p.bold(true))
        .and_then(|p| p.size(4, 2))
        .and_then(|p| p.writeln("Working"))
        .and_then(|p| p.size(1, 1))
        .and_then(|p| p.bold(false))
        .and_then(|p| p.underline(UnderlineMode::None))
        .and_then(|p| p.writeln(&format!("Vendor ID: {}", vendor_id)))
        .and_then(|p| p.writeln(&format!("Device ID: {}", device_id)))
        .and_then(|p| p.feeds(10))
        .and_then(|p| p.print_cut())
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn text_print(vendor_id: u16, device_id: u16, text: String) -> Result<(), String> {
    let driver = NativeUsbDriver::open(vendor_id, device_id).map_err(|e| e.to_string())?;
    let protocol = Protocol::default();
    let mut printer = Printer::new(driver, protocol, None);
    let printer = printer.init().map_err(|e| e.to_string())?;
    printer
        .writeln(&text)
        .and_then(|p| p.feeds(10))
        .and_then(|p| p.print_cut())
        .map_err(|e| e.to_string())?;
    Ok(())
}



#[tauri::command]
fn pass_print(vendor_id: u16, device_id: u16, bcbp_data: String, image_data: Vec<u8>) -> Result<(), String> {

    let driver = NativeUsbDriver::open(vendor_id, device_id).map_err(|e| e.to_string())?;
    let protocol = Protocol::default();
    let mut printer = Printer::new(driver, protocol, None);
    let printer = printer.init().map_err(|e| e.to_string())?;
    
    // BCBPデータを印刷
    printer.bit_image_from_bytes_option(
            &image_data,
            BitImageOption::new(Some(1600), Some(1800), BitImageSize::Normal).unwrap(),
        )
        .and_then(|p: &mut Printer<NativeUsbDriver>| p.feeds(4))
        .and_then(|p: &mut Printer<NativeUsbDriver>| p.pdf417(&bcbp_data))
        .and_then(|p: &mut Printer<NativeUsbDriver>| p.feeds(1))
        .and_then(|p: &mut Printer<NativeUsbDriver>| p.print())
        .map_err(|e| e.to_string())?;
    
    Ok(())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_usb_devices,
            text_print,
            pass_print,
            test
          ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
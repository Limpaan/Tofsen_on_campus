

export function GetContainerSize (elementId: string) {
    const container = document.getElementById (elementId);

    if (container) {
        let message = "The width of the contents with padding: " + container.scrollWidth + "px.\n";
        message += "The height of the contents with padding: " + container.scrollHeight + "px.\n";
        message += "The height of the contents with padding: " + container.clientHeight + "px.\n";

        console.log(message);
    }
}
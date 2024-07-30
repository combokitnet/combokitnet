function formatLargeNumber(x: number): string {
    if (typeof x !== 'number') {
        return x;
    }

    let formattedNumber: string;

    if (x <= 1000) {
        formattedNumber = x.toString();
    } else if (x < 1e6) {
        formattedNumber = (x / 1e3).toFixed(1) + 'k+';
    } else if (x < 1e9) {
        formattedNumber = (x / 1e6).toFixed(1) + 'M+';
    } else if (x < 1e12) {
        formattedNumber = (x / 1e9).toFixed(1) + 'B+';
    } else {
        formattedNumber = (x / 1e12).toFixed(1) + 'T+';
    }

    formattedNumber = formattedNumber.replace(/\.0(?=[kMBT]\+)/, '');

    return formattedNumber;
}

export { formatLargeNumber };

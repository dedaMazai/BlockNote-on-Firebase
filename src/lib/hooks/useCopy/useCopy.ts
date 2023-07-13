import React from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export const useCopyToClipboard = (): [CopiedValue, CopyFn, boolean] => {
    const [copiedText, setCopiedText] = React.useState<CopiedValue>(null);
    const [isSuccess, setIsSuccess] = React.useState(false);

    React.useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
            }, 800);
        }
    }, [isSuccess]);

    const copy: CopyFn = React.useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setIsSuccess(true);
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);
            setIsSuccess(false);
            return false;
        }
    }, []);

    return [copiedText, copy, isSuccess];
};

// src/messages.js
export default async function getMessages(locale) {
    try {
        return (await import(`./messages/${locale}.json`)).default;
    } catch (error) {
        console.error('Missing translation for locale:', locale);
        return (await import(`./messages/ko.json`)).default;
    }
}

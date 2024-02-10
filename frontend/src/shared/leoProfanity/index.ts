import filter from 'leo-profanity';

export const getLeoProfanityFilter = (lang: 'en' | 'fr') => {
    filter.loadDictionary(lang)
    return filter
};

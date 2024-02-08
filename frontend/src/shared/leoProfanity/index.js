import filter from 'leo-profanity';

export const getLeoProfanityFilter = (lang) => {
    filter.loadDictionary(lang)
    return filter
};

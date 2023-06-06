export const isValidPostForm = (title, postValue, genre, image) => !title.isEmpty && postValue && genre && genre !== '';

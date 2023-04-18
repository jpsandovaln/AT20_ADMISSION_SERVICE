import axios from 'axios';
const API_URL = 'http://localhost:9292';
export const compilerCode = async (file, codeLanguage) => {
    const languages = {
        '.java': 'java',
        '.js': 'javascript',
        '.cs': 'csharp',
        '.py': 'python'
    };
    try {
        const setLanguage = languages[codeLanguage];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', setLanguage);
        const response = await axios.post(`${API_URL}/api/v1.0/compiler/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        // console.log(error);
        // console.log(error.response.data.stdout);
        const output = error.response.data.stdout;
        return output;
    }
};

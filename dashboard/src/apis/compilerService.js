import axios from 'axios';
/************First try forma****** */
const API_URL = 'http://localhost:9292';
export const compilerCode = async (file, codeLanguage) => {
    const languages = {
        '.java': 'java',
        '.js': 'javascript',
        '.cs': 'csharp',
        '.py': 'python'
    };
    try {
        const setLanguage = languages[codeLanguage]
        const formData = new FormData();
        //console.log(file);
        formData.append('file', file);
        formData.append('language', setLanguage);
        //console.log(formData);
        const response = await axios.post(`${API_URL}/api/v1.0/compiler/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        console.log(error.response.data.stdout);
        const output = error.response.data.stdout;
        return output;
    }
};

//************2da forma******* */
// const FormData = require('form-data');
// export const compilerCode = async (file, codeLanguage) => {
//     const languages = {
//         '.java': 'java',
//         '.js': 'javascript',
//         '.cs': 'csharp',
//         '.py': 'python'
//     };
//     const setLanguage = languages[codeLanguage]
//     let data = new FormData();
//     data.append('file', file);
//     data.append('language', setLanguage);

//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://localhost:9292/api/v1.0/compiler/',
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         },
//         data: data
//     };
//     const response1 = await axios(config);
//     console.log(response1.data);
//     console.log(JSON.stringify(response1.data));
//     return response1;
    //******************************************* */
    // const response = axios.request(config)
    //     .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
//}
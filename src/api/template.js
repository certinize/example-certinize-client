import axios from 'axios';

import {GATEWAY_ENDPOINT_URL} from './index.js';
import {resolve} from './resolve.js';

const TEMPLATES_ENDPOINT = `${GATEWAY_ENDPOINT_URL}/templates`;

/**
 * Add e-Certificate tempalte
 * @param {any} files
 * @return {any}
 */
export async function addCertificateTemplate(files) {
  const formData = new FormData();
  formData.append('image', files);

  return await resolve(
      axios.post(TEMPLATES_ENDPOINT, formData).then((res) => res.data),
  );
}

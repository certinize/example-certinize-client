import axios from 'axios';

import { GATEWAY_ENDPOINT_URL } from './index.js';
import { resolve } from './resolve.js';

const TEMPLATES_ENDPOINT = `${GATEWAY_ENDPOINT_URL}/templates`;

export async function addCertificate(user, pass) {
  const formData = new FormData();
  formData.append('foo', 'bar');

  return await resolve(
    axios.post(TEMPLATES_ENDPOINT, { user, pass }).then((res) => res.data),
  );
}

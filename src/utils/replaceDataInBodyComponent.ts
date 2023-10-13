const replaceDataInBodyComponent = (body: string = '') => {
  const updatedBody = (body || '')
    // @ts-ignore
    .replaceAll('/uploads', `${import.meta.env.VITE_API_URL}/uploads`)
    .replaceAll('<table>', `<div style="overflow-x: auto;"><table>`)
    .replaceAll('</table>', `</table></div>`)

  return updatedBody
}

export default replaceDataInBodyComponent

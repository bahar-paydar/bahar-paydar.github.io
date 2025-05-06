const rtls = [ 'fa' ];

export function dir(lang: string){
  return rtls.includes(lang) ? 'rtl' : 'ltr';
}
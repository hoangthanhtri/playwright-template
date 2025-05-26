export async function performLogin(page, username, password) {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login');
}

export async function highlightElement(page, locator) {
  console.log(`🔍 Highlighting: ${locator.toString()}`);

  const elements = await locator.elementHandles();

  if (elements.length === 0) {
    console.warn(
      `⚠️ Elemen ${locator.toString()} tidak ditemukan, mungkin tidak ditampilkan.`
    );
    return;
  }

  for (const element of elements) {
    if (!(await element.isVisible())) {
      console.warn(
        `⚠️ Elemen ${locator.toString()} tidak terlihat, melewati highlight.`
      );
      continue;
    }

    await element.scrollIntoViewIfNeeded();
    await page.evaluate((el) => {
      el.style.border = "2px solid red";
    }, element);

    console.log(`✅ Highlight selesai untuk elemen: ${locator.toString()}`);

    await page.waitForTimeout(500);
  }
}

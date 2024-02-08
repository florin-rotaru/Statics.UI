import identity from 'src/modules/identity';

(async () => {
  try {
    await identity.getAsync();
  } catch {}
})();

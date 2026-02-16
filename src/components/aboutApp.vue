<script setup lang="ts">
const installDialogVisible = ref(false);

const openDialog = () => {
  installDialogVisible.value = true;
};

const copied = ref(false);
const copyAppLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Copy failed", e);
  }
};

const openLink = (url: string) => {
  window.open(url, "_blank");
};
</script>

<template>
  <Button
    icon="pi pi-question-circle"
    size="large"
    severity="secondary"
    @click="openDialog"
  />

  <Dialog
    class="about-dialog w-full max-w-4xl"
    v-model:visible="installDialogVisible"
    modal
    header="Pomoć"
  >
    <Accordion>
      <AccordionPanel value="0">
        <AccordionHeader>Instaliranje aplikacije</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-3">
            <p>
              Za najbolje moguće korisničko iskustvo, bržu i stabilniju
              aplikaciju - potrebno je instalirati aplikaciju kroz Google Chrome
              pretraživač.
            </p>
            <p>
              Da biste instalirali aplikaciju na svoj uređaj, otvorite link u
              Google Chrome pretraživaču a zatim kliknite na
              <b>Instaliraj</b> dugme. Kada se pojavi prozor u kome se traži
              dozvola za instaliranje aplikacije, potrebno je da potvrdite
              (Potvrdi / Dozvoli / Allow / Install). Ukoliko odbijete, postupak
              možete ponoviti.
            </p>
            <p>
              Klikom na dugme ispod možete kopirate link aplikacije a zatim ga
              zalepiti u Google Chrome pretraživač.
            </p>
            <Button
              size="small"
              :label="!copied ? 'Kopiraj link' : 'Link kopiran'"
              :icon="!copied ? 'pi pi-copy' : 'pi pi-check'"
              :disabled="copied"
              icon-pos="right"
              @click="copyAppLink"
            />
            <p>
              Ukoliko nemate Chrome pretraživač, aplikaciju možete instalirati
              ili dodati ikonicu/prečicu na početni ekran, i koristeći druge
              pretraživače (Firefox, Opera, Edge, i drugo). Potrebno je klikom
              na tri tačke/crtice otvoriti meni i pronaći opciju "Instaliraj"
              ili nešto kao "Dodaj aplikaciju/prečicu na početni ekran".
            </p>
            <p>
              iOS: Ukoliko gore navedeni postupak ne uspe na iOS uređaju,
              otvorite aplikaciju u Safari pretraživaču, tapnite na dugme za
              deljenje (Share) i izaberite "Add to Home Screen" / "Dodaj na
              početni ekran".
            </p>
            <p>
              Svakako možete nastaviti da koristite aplikaciju i bez
              instaliranja.
            </p>
          </div>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="1">
        <AccordionHeader>Obaveštenja</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-3">
            <p>
              Kao i svaka druga, i ova aplikacija može slati obaveštenja na vaš
              uređaj, ali je neophodno da to prvo odobrite klikom na ikonicu
              obaveštenja
              <Chip
                icon="pi pi-bell"
                class="p-1.5! rounded-md! [&>span]:text-sm! [&>span]:inline-flex! [&>span]:items-center [&>span]:justify-center"
              />, potom će se pojaviti prozor u kome se traži dozvola, potrebno
              je da odobrite klikom na "Dozvoli" ili "Approve" ili slično.
            </p>
            <p>
              Ukoliko su obaveštenja odbijena, možete resetovati podešavanja
              sajta u pretraživaču: Podešavanja > Privatnost/Bezbednost >
              Podešavanja sajta > <i>izaberite url ove aplikacije</i> >
              Resetujte dozvole.
            </p>
          </div>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="2">
        <AccordionHeader>Offline režim</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-3">
            <p>
              Aplikacije može da radi i kada nemate interneta, sve što uradite
              biće sačuvano na vašem uređaju a kada ponovo uspostavite vezu sa
              internetom aplikacija će se automatski sinhronizovati sa cloud-om.
            </p>
            <p>
              Kada uđete u offline režim, pojaviće se indikator
              <Chip
                icon="pi pi-wifi"
                class="p-1.5! rounded-md! [&>span]:text-sm! [&>span]:inline-flex! [&>span]:items-center [&>span]:justify-center"
              />
              koji će vam to signalizirati.
            </p>
          </div>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="3">
        <AccordionHeader>O aplikaciji</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-3">
            <p>
              Izrada PWA i web aplikacije
              <Button
                label="Webdak"
                icon="pi pi-external-link"
                size="small"
                iconPos="right"
                @click="openLink('https://webdak.rs')"
              />
            </p>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </Dialog>
</template>

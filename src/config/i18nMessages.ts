export const messages = {
  sr: {
    words: {
      hello: "Zdravo Svete!",
      home: "Početna",
      chooseLanguage: "Izaberi jezik",
      install: "Instaliraj",
      notNow: "Ne sad",
      refresh: "Osveži",
      save: "Sačuvaj",
      cancel: "Otkaži",
      update: "Ažuriraj",
      updated: "Ažurirano",
      edit: "Izmeni",
      delete: "Izbriši",
      deleted: "Izbrisan",
      copyLink: "Kopiraj link",
      linkCopied: "Link kopiran",
      hideButton: "Skloni dugme",
      restore: "Povrati",
      later: "Kasnije",
      send: "Pošalji",
      profile: "Korisnički nalog",
      register: "Registruj se",
      login: "Prijavi se",
      logout: "Odjavi se",
      resetPassword: "Resetujte lozinku",
      or: "ili",
    },
    meta: {
      description: "Webdak Vue3 PWA šablon",
    },
    toasts: {
      upToDateToastGroup: {
        success: {
          summary: "Aplikacija je ažurirana",
          detail: "Već imate najnoviju verziju.",
        },
      },
      notificationsToastGroup: {
        danger1: {
          summary: "Nije moguće omogućiti obaveštenja.",
          detail1: "Service Worker nije podržan.",
          detail2: "Push Manager nije podržan.",
        },
        warn1: {
          summary: "Obaveštenja su blokirana.",
          detail:
            "Obaveštenja su blokirana u pretraživaču. Otvorite podešavanja sajta i ponovo ih omogućite. Ili ih resetujte pa opet kliknite na ovo isto dugme u aplikaciji.",
        },
        warn2: {
          summary: "Pokušajte ponovo.",
          detail:
            "Dozvola nije izabrana. Kliknite ponovo i odaberite 'Dozvoli' ili 'Allow'.",
        },
        warn3: {
          summary: "Obaveštenja blokirana.",
          detail: "Dozvola za obaveštenja nije odobrena.",
        },
        danger2: {
          summary: "VAPID public key nije postavljen.",
        },
        danger3: {
          summary: "Neuspešno omogućavanje obaveštenja.",
        },
        success: {
          summary: "Obaveštenja su omogućena.",
        },
      },
      installToastGroup: {
        secondary: {
          summary: "Instalirajte aplikaciju",
          detail:
            "Možete instalirati aplikaciju na svoj uređaj kako biste imali brži pristup i više mogućnosti.",
        },
        success: {
          summary: "Instalacija u toku...",
          detail:
            "Aplikacija će biti instalirana za par trenutaka i nakon toga je možete otvoriti sa početnog ekrana.",
        },
      },
      offlineToastGroup: {
        success: {
          summary: "Online",
          detail: "Ponovo ste povezani na mrežu.",
        },
        warn: {
          summary: "Offline",
          detail:
            "Trenutno niste na mreži, srećom aplikacija može da radi offline s tim što neke funkcionalnosti možda neće biti moguće dok se ponovo ne povežete na mrežu.",
        },
      },
      updatePwaToastGroup: {
        warn: {
          summary: "Nova verzija aplikacije je dostupna",
          detail:
            "Ažurirajte odmah klikom na dugme ispod (završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti) ili kasnije klikom na dugme na vrhu.",
        },
        success: {
          summary: "Aplikacija je ažurirana.",
          detail: "",
        },
      },
      screenWakeLockToastGroup: {
        success: {
          summary: "Svetlo uključeno",
          detail: "Displej će sada biti osvetljen konstanto.",
        },
        error: {
          summary: "Nažalost...",
          detail:
            "Na ovom uređaju nije moguće uključiti konstanto osvetljenje.",
        },
      },
      group: {
        success: {
          summary: "",
          detail: "",
        },
      },
    },
    dialogs: {
      installFailed: {
        header: "Instalacija nije moguća u trenutnom pretraživaču.",
        text1:
          "Da biste instalirali aplikaciju na svoj uređaj, otvorite link u Google Chrome pretraživaču a zatim kliknite na {0} dugme.",
        text2:
          "Klikom na dugme ispod možete kopirate link aplikacije a zatim ga zalepiti u Google Chrome pretraživač.",
        text3:
          'Svakako možete nastaviti da koristite aplikaciju i bez instaliranja. Ako želite, klikom na dugme ispod, možete skloniti "Instaliraj" dugme.',
      },
      updateDialogConfirm: {
        header: "Ažuriranje dostupno",
        message:
          "Da li želite da ažurirate aplikaciju? Pre toga završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti.",
        reject: "Kasnije",
        accept: "Ažuriraj",
      },
    },
    api: {
      noRecords: "Nema zapisa",
      noDeletedRecords: "Nema obrisanih zapisa",
      loadingFailed: "Učitavanje nije uspelo",
      changeSaved: "Izmene sačuvane",
      changeFailed: "Čuvanje izmene nije uspelo",
      deleteSuccess: "Obrisano (soft delete)",
      deleteFailed: "Brisanje nije uspelo",
      readFromIDB: "Učitaj iz IndexedDB",
      readFromSB: "Učitaj iz Supabase",
      recordRestored: "Zapis je vraćen",
      recordRestoreFailed: "Vraćanje nije uspelo",
      showDeleted: "Prikaži obrisane",
      syncOnReconnect: "Auto-sinhronizacija pri ponovnom povezivanju",
      syncDb: "Sinhronizuj bazu",
      syncSuccess: "Sinhronizacija završena.",
      syncFailed: "Sinhronizacija nije uspela.",
      writeToIDB: "Sačuvaj u IndexedDB",
      writeToIDBSuccess: "Sačuvano u IndexedDB",
      writeToSB: "Sačuvaj u Supabase",
      writeToSBSuccess: "Sačuvano u Supabase",
      writeToDBFailed: "Čuvanje nije uspelo",
      writeLocallySuccess: "Sačuvano lokalno, čeka sinhronizaciju",
    },
    form: {
      fields: {
        title: "Naslov",
        username: "Korisničko ime",
        password: "Lozinka",
        passwordConfirm: "Potvrdite lozinku",
        newPassword: "Nova lozinka",
        newPasswordConfirm: "Potvrdite novu lozinku",
        body: "Poruka",
        url: "link",
        button: "Pošalji",
      },
      message: {
        success: "Push obaveštenje poslato",
        error: "Slanje push obaveštenja nije uspelo",
        registerSuccess: "Uspešna registracija",
        registerSuccessMessage:
          "Da biste završili registraciju, verifikujte svoju email adresu klikom na link koji vam je poslat na email.",
        registerFailed: "Registracija nije uspela",
        registerFailedEmailRateLimit:
          "Poslato je previše zahteva za email. Sačekajte nekoliko minuta pa pokušajte ponovo",
        loginFailed: "Prijava nije uspela",
        loginFailedWrongCredentials: "Netačni podaci za prijavu",
        loginFailedUnverifiedEmail:
          "Potrebno je prvo da verifikujete svoju email adresu klikom na link koji vam je poslat na email.",
        loginSuccess: "Uspešna prijava",
        logoutFailed: "Odjava nije uspela",
        logoutSuccess: "Uspešna odjava",
        loggedRequired: "Morate biti prijavljeni",
      },
      validation: {
        titleRequired: "Naslov je obavezan",
        usernameRequired: "Korisničko ime je obavezno",
        usernameMaxLength: "Korisničko ime može imati 30 karaktera ili manje",
        emailRequired: "Email je obavezan",
        passwordRequired: "Lozinka je obavezna",
        passwordConfirmRequired: "Potvrda lozinke je obavezna",
        passwordMismatch: "Lozinke se ne poklapaju",
        passwordMinLength: "Lozinka mora imati najmanje 6 karaktera",
      },
    },
    authConfirmation: {
      title: "Email adresa je verifikovana",
      text: "Verifikacija je uspešna. Sada se možete prijaviti (u aplikaciji ako ste je instalirali) sa svojim podacima.",
    },
    googleAuth: {
      pageConfirmationTitle: "Prijavljeni sa Google nalogom",
      pageConfirmationText:
        "Uspešno ste se prijavili sa Google nalogom, možete nastaviti da koristite aplikaciju.",
      googleEmailLocked:
        "Za naloge prijavljene preko Google-a, nije moguće promeniti email adresu na ovaj način.",
      failedSigning: "Prijavljivanje sa Google nalogom nije uspelo.",
    },
    userEdit: {
      editButton: "Izmeni informacije",
      editSuccessfulTitle: "Promene su sačuvane",
      editSuccessfulTextEmail:
        "Potrebno je da potvrdite novu email adresu klikom na link koji vam je poslat.",
      editFailedTitle: "Promene nisu sačuvane",
      editFailedOverLimit: "Molimo pokušajte malo kasnije",
      editFailedSameData: "Niste ništa promenili",
      editEmailVerificationOne:
        "Link za potvrdu je prihvaćen. Potvrdite i link koji je poslat na vašu drugu email adresu.",
      editEmailVerificationBoth:
        "Link za potvrdu je prihvaćen. Obe email adrese su potvrđene. Bićete odjavljeni sa svih uređaja. Prijavite se ponovo sa novom email adresom.",
    },
    resetPasswordRequest: {
      requestTitle: "Link uspešno poslat na email.",
      requestMessage:
        "Link za resetovanje lozinke vam je poslat na email. Potrebno je da kliknete na link koji će vas odvesti na stranicu gde možete resetovati svoju lozinku. Link važi 1 sat.",
      requestFailTitle: "Link nije poslat",
      requestFailMessage:
        "Link za resetovanje lozinke vam je već poslat na email. Molimo pokušajte kasnije.",
      pageTitle: "Resetovanje lozinke",
      successfulChange: "Lozinka uspešno promenjena",
      successfulChangeText:
        "Bićete odjavljeni na svim uređajima, uključujući i ovaj. Molimo prijavite se sa novom lozinkom.",
      failedChangeTitle: "Promena lozinke neuspešna",
      failedChangeText:
        "Nova lozinka treba da se razlikuje od stare lozinke. Molimo pokušajte ponovo.",
      checkingLink: "Link za resetovanje lozinke se proverava...",
      invalidOrExpiredLinkTitle: "Neuspešno",
      invalidOrExpiredLinkText:
        "Link za resetovanje lozinke je istekao ili nije ispravan. Možete pokušati ponovo.",
      temporaryCheckFailedTitle: "Privremeni problem",
      temporaryCheckFailedText:
        "Trenutno nije moguće proveriti link za resetovanje lozinke. Proverite internet vezu i pokušajte ponovo.",
    },
    aboutTitle: "Pomoć",
    aboutAppInstall: {
      title: "Instaliranje aplikacije",
      text1:
        "Za najbolje moguće korisničko iskustvo, bržu i stabilniju aplikaciju - potrebno je instalirati aplikaciju kroz Google Chrome pretraživač.",
      text2:
        "Da biste instalirali aplikaciju na svoj uređaj, otvorite link u Google Chrome pretraživaču a zatim kliknite na {0} dugme. Kada se pojavi prozor u kome se traži dozvola za instaliranje aplikacije, potrebno je da potvrdite (Potvrdi / Dozvoli / Allow / Install). Ukoliko odbijete, postupak možete ponoviti.",
      text3:
        "Klikom na dugme ispod možete kopirate link aplikacije a zatim ga zalepiti u Google Chrome pretraživač.",
      text4:
        'Ukoliko nemate Chrome pretraživač, aplikaciju možete instalirati ili dodati ikonicu/prečicu na početni ekran, i koristeći druge pretraživače (Firefox, Opera, Edge, i drugo). Potrebno je klikom na tri tačke/crtice otvoriti meni i pronaći opciju "Instaliraj" ili nešto kao "Dodaj aplikaciju/prečicu na početni ekran".',
      text5:
        'iOS: Ukoliko gore navedeni postupak ne uspe na iOS uređaju, otvorite aplikaciju u Safari pretraživaču, tapnite na dugme za deljenje (Share) i izaberite "Add to Home Screen" / "Dodaj na početni ekran".',
      text6:
        "Svakako možete nastaviti da koristite aplikaciju i bez instaliranja.",
    },
    aboutNotifications: {
      title: "Obaveštenja",
      text1:
        "Kao i svaka druga, i ova aplikacija može slati obaveštenja na vaš uređaj, ali je neophodno da to prvo odobrite klikom na ikonicu obaveštenja",
      text2:
        'potom će se pojaviti prozor u kome se traži dozvola, potrebno je da odobrite klikom na "Dozvoli" ili "Approve" ili slično.',
      text3:
        "Ukoliko su obaveštenja odbijena, možete resetovati podešavanja sajta u pretraživaču: Podešavanja > Privatnost/Bezbednost > Podešavanja sajta > {0} > Resetujte dozvole.",
      selectAppUrl: "izaberite url ove aplikacije",
    },
    aboutOffline: {
      title: "Offline režim",
      text1:
        "Aplikacije može da radi i kada nemate interneta, sve što uradite biće sačuvano na vašem uređaju a kada ponovo uspostavite vezu sa internetom aplikacija će se automatski sinhronizovati sa cloud-om.",
      text2: "Kada uđete u offline režim, pojaviće se indikator",
      text3: "koji će vam to signalizirati.",
    },
    aboutApp: {
      title: "O aplikaciji",
      text1: "Izrada PWA i web aplikacije",
    },
  },
  en: {
    words: {
      hello: "Hello World!",
      home: "Home",
      chooseLanguage: "Choose language",
      install: "Install",
      notNow: "Not now",
      refresh: "Refresh",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      updated: "Updated",
      edit: "Edit",
      delete: "Delete",
      deleted: "Deleted",
      copyLink: "Copy link",
      linkCopied: "Link copied",
      hideButton: "Hide button",
      restore: "Restore",
      later: "Later",
      send: "Send",
      profile: "User account",
      register: "Register",
      login: "Login",
      logout: "Logout",
      resetPassword: "Reset password",
      or: "or",
    },
    meta: {
      description: "Reusable Vue3 PWA template by Webdak",
    },
    toasts: {
      upToDateToastGroup: {
        success: {
          summary: "Application is updated",
          detail: "You already have the latest version.",
        },
      },
      notificationsToastGroup: {
        danger1: {
          summary: "Unable to enable notifications.",
          detail1: "Service Worker not supported.",
          detail2: "Push Manager not supported.",
        },
        warn1: {
          summary: "Notifications are blocked.",
          detail:
            "Notifications are blocked in the browser. Open the site settings and re-enable them. Or reset them and click this same button in the app again.",
        },
        warn2: {
          summary: "Try again.",
          detail:
            "Permission not selected. Click again and select 'Allow' or 'Approve'.",
        },
        warn3: {
          summary: "Notifications are blocked.",
          detail: "Notification permission not granted.",
        },
        danger2: {
          summary: "VAPID public key not set.",
        },
        danger3: {
          summary: "Failed to enable notifications.",
        },
        success: {
          summary: "Notifications are enabled.",
        },
      },
      installToastGroup: {
        secondary: {
          summary: "Install the app",
          detail:
            "You can install the app on your device for faster access and more features.",
        },
        success: {
          summary: "Installation in progress...",
          detail:
            "The application will be installed in a few moments and after that you can open it from the home screen.",
        },
      },
      offlineToastGroup: {
        success: {
          summary: "Online",
          detail: "You are reconnected to the network.",
        },
        warn: {
          summary: "Offline",
          detail:
            "You are currently offline, fortunately the app can work offline, however some functionality may not be available until you reconnect.",
        },
      },
      updatePwaToastGroup: {
        warn: {
          summary: "A new version of the app is available",
          detail:
            "Update now by clicking the button below (finish the current action as the app will close and restart itself) or later by clicking the button at the top.",
        },
        success: {
          summary: "Application is updated",
          detail: "",
        },
      },
      screenWakeLockToastGroup: {
        success: {
          summary: "Light on",
          detail: "The display will now be lit constantly.",
        },
        error: {
          summary: "Unfortunately...",
          detail:
            "It is not possible to turn on constant lighting on this device.",
        },
      },
      group: {
        success: {
          summary: "",
          detail: "",
        },
      },
    },
    dialogs: {
      installFailed: {
        header: "Installation is not possible in the current browser.",
        text1:
          "To install the application on your device, open the link in the Google Chrome browser and then click the {0} button.",
        text2:
          "By clicking the button below, you can copy the application link and then paste it into the Google Chrome browser.",
        text3:
          'You can certainly continue to use the application without installing it. If you want, you can hide the "Install" button by clicking the button below.',
      },
      updateDialogConfirm: {
        header: "Update available",
        message:
          "Do you want to update the app? Before that, finish the current action because the application will close and restart itself.",
        reject: "Later",
        accept: "Update",
      },
    },
    api: {
      noRecords: "No records",
      noDeletedRecords: "No deleted records",
      loadingFailed: "Loading failed",
      changeSaved: "Changes saved",
      changeFailed: "Failed to save changes",
      deleteSuccess: "Deleted (soft delete)",
      deleteFailed: "Deletion failed",
      readFromIDB: "Read from IndexedDB",
      readFromSB: "Read from Supabase",
      recordRestored: "Record restored",
      recordRestoreFailed: "Failed to restore record",
      showDeleted: "Show deleted",
      syncOnReconnect: "Auto-sync on reconnect",
      syncDb: "Sync DB",
      syncSuccess: "Sync successful",
      syncFailed: "Sync failed",
      writeToIDB: "Save in IndexedDB",
      writeToIDBSuccess: "Saved in IndexedDB",
      writeToSB: "Save in Supabase",
      writeToSBSuccess: "Saved in Supabase",
      writeToDBFailed: "Saving failed",
      writeLocallySuccess: "Saved locally, waiting for sync",
    },
    form: {
      fields: {
        title: "Title",
        username: "Username",
        password: "Password",
        passwordConfirm: "Confirm password",
        newPassword: "New password",
        newPasswordConfirm: "Confirm new password",
        body: "Message",
        url: "Link",
        button: "Send",
      },
      message: {
        success: "Push notification sent",
        error: "Failed to send push notification",
        registerSuccess: "Successful registration",
        registerSuccessMessage:
          "To complete registration, please verify your email address by clicking the link sent to your email.",
        registerFailed: "Registration failed",
        registerFailedEmailRateLimit:
          "Too many email requests. Please wait a few minutes and try again",
        loginFailed: "Login failed",
        loginFailedWrongCredentials: "Incorrect login information",
        loginFailedUnverifiedEmail:
          "You need to first verify your email address by clicking the link sent to your email.",
        loginSuccess: "Successful login",
        logoutFailed: "Logout failed",
        logoutSuccess: "Successful logout",
        loggedRequired: "You must be logged in",
      },
      validation: {
        titleRequired: "Title is required",
        usernameRequired: "Username is required",
        usernameMaxLength: "Username can be 30 characters or less",
        emailRequired: "Email is required",
        passwordRequired: "Password is required",
        passwordConfirmRequired: "Password confirmation is required",
        passwordMismatch: "Passwords do not match",
        passwordMinLength: "Password must be at least 6 characters",
      },
    },
    googleAuth: {
      pageConfirmationTitle: "Signed with Google",
      pageConfirmationText:
        "You have successfully signed with Google account, you may continue to use the app.",
      googleEmailLocked:
        "For accounts signed in through Google, it is not possible to change the email address in this way.",
      failedSigning: "Failed to sign in with Google account.",
    },
    userEdit: {
      editButton: "Edit info",
      editSuccessfulTitle: "Changes saved.",
      editSuccessfulTextEmail:
        "You need to confirm the new email address by clicking on the link sent to you.",
      editFailedTitle: "Changes not saved",
      editFailedOverLimit: "Please try again a little bit later",
      editFailedSameData: "You have not changed anything",
      editEmailVerificationOne:
        "Confirmation link accepted. Please confirm the link sent to your other email address.",
      editEmailVerificationBoth:
        "Confirmation link accepted. Both email addresses are confirmed. You will be logged out on all devices. Please log in again with your new email address.",
    },
    authConfirmation: {
      title: "Email verified",
      text: "Your email has been verified successfully. You can now log in (in app if you've installed it) with your details.",
    },
    resetPasswordRequest: {
      requestTitle: "Link successfully sent to email.",
      requestMessage:
        "A password reset link has been sent to your email. You need to click on a link that will take you to a page where you can reset your password. The link is valid for 1 hour.",
      requestFailTitle: "Reset link not sent",
      requestFailMessage:
        "A password reset link has already been sent to your email recently. Please try again later.",
      pageTitle: "Password reset",
      successfulChange: "Password changed successfully",
      successfulChangeText:
        "You will be logged out from all devices, including this one. Please log in with new password.",
      failedChangeTitle: "Changing password failed",
      failedChangeText:
        "New password should be different from the old password. Please try again.",
      checkingLink: "The password reset link is being verified...",
      invalidOrExpiredLinkTitle: "Failed",
      invalidOrExpiredLinkText:
        "The password reset link has expired or is invalid. You can try again.",
      temporaryCheckFailedTitle: "Temporary issue",
      temporaryCheckFailedText:
        "We couldn't verify the password reset link right now. Check your internet connection and try again.",
    },
    aboutTitle: "Help",
    aboutAppInstall: {
      title: "Installing the application",
      text1:
        "For the best possible user experience, a faster and more stable application - it is necessary to install the application through the Google Chrome browser.",
      text2:
        "To install the application on your device, open the link in the Google Chrome browser and then click the {0} button. When a window appears asking for permission to install the application, you need to confirm (Confirm / Allow / Install). If you refuse, you can repeat the process.",
      text3:
        "By clicking the button below, you can copy the application link and then paste it into the Google Chrome browser.",
      buttonLabelCopy: "Copy link",
      buttonLabelCopied: "Link copied",
      text4:
        'If you don\'t have Chrome browser, you can install the application or add an icon/shortcut to the home screen using other browsers (Firefox, Opera, Edge, etc.). You need to click on the three dots/dashes to open the menu and find the "Install" option or something like "Add application/shortcut to home screen".',
      text5:
        'iOS: If the above procedure does not work on your iOS device, open the app in the Safari browser, tap the Share button, and select "Add to Home Screen".',
      text6:
        "You can certainly continue to use the application without installing it.",
    },
    aboutNotifications: {
      title: "Notifications",
      text1:
        "Like any other application, this application can send notifications to your device, but you must first approve this by clicking on the notification icon",
      text2:
        'then a window will appear asking for permission, you need to approve by clicking "Allow" or "Approve" or similar.',
      text3:
        "If notifications are rejected, you can reset the site settings in your browser: Settings > Privacy/Security > Site Settings > {0} > Reset permissions.",
      selectAppUrl: "select this app's url",
    },
    aboutOffline: {
      title: "Offline mode",
      text1:
        "The application can work even when you don't have internet access, everything you do will be saved on your device and when you reconnect to the internet, the application will automatically sync with the cloud.",
      text2: "When you enter offline mode, an indicator will appear",
      text3: "which will signal this to you.",
    },
    aboutApp: {
      title: "About application",
      text1: "Developing PWAs and web applications by",
    },
  },
};

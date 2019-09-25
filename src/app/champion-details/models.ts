export abstract class ModalControls {
   spellDetailsOpened = false;

   openSpellDetails() {
    this.spellDetailsOpened = true;
  }

   closeSpellDetails() {
    this.spellDetailsOpened = false;
  }
}

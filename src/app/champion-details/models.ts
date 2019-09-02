export abstract class ModalControls {
  protected spellDetailsOpened = false;

  protected openSpellDetails() {
    this.spellDetailsOpened = true;
  }

  protected closeSpellDetails() {
    this.spellDetailsOpened = false;
  }
}

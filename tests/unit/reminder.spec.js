import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Reminders from '@/components/Reminders.vue';

describe('Reminders', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Reminders);
  });

  function addReminder(body) {
    const newReminder = wrapper.find('.new-reminder');

    newReminder.element.value = body;
    newReminder.trigger('input');

    wrapper.find('button').trigger('click');
  }

  function remindersList() {
    return wrapper.find('ul').text();
  }

  it('hides the reminders list if there are none', () => {
    expect(wrapper.contains('ul')).to.equal(false);
  });

  it('can add reminders', () => {
    addReminder('Go to the store');

    expect(remindersList()).to.have.string('Go to the store');
  });

  it('can remove any reminder', () => {
    addReminder('Go to the store');
    addReminder('Finish screencast');

    const deleteButton = wrapper.find('ul > li:first-child .delete');
    deleteButton.trigger('click');

    expect(remindersList()).to.have.not.string('Go to the store');
    expect(remindersList()).to.have.string('Finish screencast');
  });
});
